import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import CreateShout from '../Shouts/CreateShout';
import { useTheme, useFocusEffect} from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import { lookupWithToken } from '../../utils/lookup';
import { AuthContext } from '../../utils';
import { useContext, useEffect, useState } from 'react';
import { toCorrectDate } from '../../utils/formatNumbers';


export default function ParentShout(props){
    const {colors} = useTheme(); 
    const {navigation, shout} = props; 
    const {userToken, userName} = useContext(AuthContext); 
    

    const styles = StyleSheet.create({
        text:{
            color: colors.text
        },
        usernameText:{
            color: colors.muted
        },
        timeText:{
            color: colors.muted
        },
        shoutContainer: {
            borderColor: colors.muted,
            borderWidth: 1,
            borderRadius: 2, 
            padding: 10, 
            borderRadius: 15,
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
        }
      });




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
            <Text style={styles.text}>{shout.content}</Text>
  

        </View>
        </TouchableOpacity>
      
    ); 
}