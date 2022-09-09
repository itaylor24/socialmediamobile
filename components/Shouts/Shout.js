import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import CreateShout from '../Shouts/CreateShout';
import { useTheme, useFocusEffect} from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import { lookupWithToken } from '../../utils/lookup';
import { AuthContext } from '../../utils';
import { useContext, useEffect, useState } from 'react';
import { toCorrectDate } from '../../utils/formatNumbers';
import ParentShout from './ParentShout';
import { LikeButton } from './LikeButton';
import { BoostButton } from './BoostButton';

export default function Shout(props){
    const {colors} = useTheme(); 
    const {navigation, shout} = props; 
    const {userToken, userName} = useContext(AuthContext); 
    const [actionShout, setActionShout] = useState(shout ? shout : null );
    
    const styles = StyleSheet.create({
        text:{
            color: colors.text, 
            fontSize: 17,
        },
        likesText:{
            color: colors.text, 
            fontSize: 17
        },
        timeText:{
            color: colors.muted
        },
        usernameText:{
            color: colors.muted
        },
        shoutContainer: {
            borderColor: colors.muted,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            padding: 20, 
            marginTop: 10,
            marginBottom: 10, 
        },
        headerText:{
            fontWeight:"bold",
            color: colors.text
        },
        headerContainer:{
            paddingBottom: 20
        },
        firstLine:{

            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
        },
        footerContainer:{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
        }
      });

      const handleAction = (data, status)=>{
        setActionShout(data); 
        console.log(data); 
      }

      useEffect(()=>{
        setActionShout(shout); 
      },[shout])


    return (
        <TouchableOpacity onPress={()=>{navigation.navigate("ShoutLookupScreen",{id:shout.id})}}>
        <View style={styles.shoutContainer}>
           
            <View style={styles.headerContainer}>

                <View style={styles.firstLine}>
                    
                <TouchableOpacity onPress={()=>{shout.user.is_same_user ? navigation.navigate("ProfileScreen") : navigation.navigate('ProfileLookupScreen',{username:shout.user.username})}}>
                    <Text style={styles.headerText}>{shout.user.displayname ? shout.user.displayname : shout.user.username}</Text>
                </TouchableOpacity>
                <Text style={styles.timeText}>{toCorrectDate(shout.timestamp)}</Text>
                </View>
                
                
                <TouchableOpacity style={{alignSelf: 'flex-start'}} onPress={()=>{shout.user.is_same_user ? navigation.navigate("ProfileScreen") : navigation.navigate('ProfileLookupScreen',{username:shout.user.username})}}>
                    <Text style={styles.usernameText}>@{shout.user.username}</Text>
                </TouchableOpacity>
                
            </View>
            {shout.content && <Text style={styles.text}>{shout.content}</Text>}
            {shout.is_boost && <ParentShout navigation={navigation} shout={shout.parent}/>}
            
            <View style={styles.footerContainer}>
                <LikeButton didPerformAction = {handleAction} shout={actionShout}/><Text style={styles.likesText}> {actionShout.likes}    </Text>
                <BoostButton didPerformAction = {handleAction} shout={actionShout}/><Text style={styles.likesText}> {actionShout.boosts} </Text>
            </View>
            
        </View>
        </TouchableOpacity>
      
    ); 
}