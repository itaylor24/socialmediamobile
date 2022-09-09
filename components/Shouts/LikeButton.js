import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../../utils";
import { lookupWithToken } from "../../utils/lookup";
export const LikeButton = (props) => {
  const [liked, setLiked] = useState(false);
  const {shout, didPerformAction} = props; 
  
  const { colors } = useTheme(); 
  const {userToken} = useContext(AuthContext); 

  const handleLike = (liked) =>{

    if(!liked){
        lookupWithToken('POST', 'https://itaylor24.pythonanywhere.com/api/shouts/action/',handleLikeAPI,userToken,{id: shout.id, action: 'like'}); 
        console.log('liking'); 
    }
    if(liked){
        lookupWithToken('POST', 'https://itaylor24.pythonanywhere.com/api/shouts/action/',handleLikeAPI,userToken,{id: shout.id, action: 'unlike'}); 
        console.log('unliking'); 
    }
    
  }

  useEffect(()=>{
    setLiked(shout.did_like); 
  },[shout])

  const handleLikeAPI = (data, status)=>{
    if(status===200){

        didPerformAction(data,status); 
    }
  }

  return (
    <Pressable onPress={() => handleLike(liked)}>
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={32}
        color={liked ? colors.primary : colors.text}
      />
    </Pressable>
  );
};