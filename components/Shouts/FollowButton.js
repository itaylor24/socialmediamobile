import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { View, Button, Text } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../utils";
import { lookupWithToken } from "../../utils/lookup";
import { StyleSheet } from "react-native"; 

export const FollowButton = (props) => {
  const [following, setFollowing] = useState(false);
  const {profile, didPerformAction} = props; 
  
  const { colors } = useTheme(); 
  const {userToken} = useContext(AuthContext); 

  const handleFollow = (following) =>{

    if(!following){
        lookupWithToken('POST', `https://itaylor24.pythonanywhere.com/api/profiles/${profile.username}/follow/`,handleFollowAPI,userToken,{action:'follow'}); 
        console.log('following'); 
    }
    if(following){
        lookupWithToken('POST', `https://itaylor24.pythonanywhere.com/api/profiles/${profile.username}/follow/`,handleFollowAPI,userToken,{action: 'unfollow'}); 
        console.log('unfollowing'); 
    }
    
  }

  useEffect(()=>{
    setFollowing(profile.is_following); 
  },[profile])

  const handleFollowAPI = (data, status)=>{
    if(status===200){
        didPerformAction(data,status); 
    }
  }
  const styles = StyleSheet.create({
    buttonContainer:{
        alignSelf: 'flex-start',
        marginTop: 10,
        borderRadius: 10, 
        borderColor: colors.muted, 
        borderWidth: 2 
    }, 
    text: {
        color: colors.text
    }
    }); 

  return (
    <View style={styles.buttonContainer}>
        <Button title={following ? "Unfollow" : "Follow"} onPress={()=>{handleFollow(following)}}/>
    </View>
  );
};

