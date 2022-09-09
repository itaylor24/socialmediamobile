import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';
import CreateShout from '../Shouts/CreateShout';
import { useTheme, useFocusEffect} from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import { lookupWithToken } from '../../utils/lookup';
import { AuthContext } from '../../utils';
import { useContext, useEffect, useState } from 'react';
import { FollowButton } from '../Shouts/FollowButton';

export default function ProfileBadge(props){
    const {colors} = useTheme(); 
    const {navigation, profile, didPerformAction} = props; 
    //const {userToken, userName} = useContext(AuthContext); 
    

    const styles = StyleSheet.create({
        text:{
            color: colors.text
        },
        count:{
            color: colors.text,
            fontWeight: 'bold', 
            fontSize: 20, 
        },
        subHeading:{
            color: colors.text,
            fontSize: 20, 
        }, 
        usernameText:{
            color: colors.muted
        },
        badgeContainer:{
            padding: 20,
            paddingTop: 0, 
            paddingBottom: 20, 
            borderColor: colors.muted, 
            borderBottomWidth: 1,
            width: "100%"
        },
        username: {
            color: colors.muted, 
            marginLeft: 10, 
            fontSize: 25
        },
        header: {
            fontWeight: 'bold', 
            color: colors.text, 
            fontSize: 25
        }
       ,
       headerContainer:{
            flexDirection: 'row',
            
       }, 
       bio: {
        marginTop: 15
       },
       bioText:{
        fontSize: 18,
        color: colors.text
       },
       
      });




    return (
        
         <View style={styles.badgeContainer}>
            {profile &&
            <View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{profile.displayname ? profile.displayname: profile.username}</Text>
                <Text style={styles.username}>@{profile.username}</Text>
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.subHeading}>Followers </Text>
                <Text style={styles.count}>{profile.follower_count}   </Text>
                <Text style={styles.subHeading}>Following </Text>
                <Text style={styles.count}>{profile.following_count}   </Text>
            </View>
            {profile.bio && <View style={styles.bio}>
                <Text style={styles.bioText}>{profile.bio}</Text>
            </View>}
            {!profile.is_same_user && <FollowButton profile={profile} didPerformAction={didPerformAction}></FollowButton>}
            </View>}
        </View>
      
    ); 
}