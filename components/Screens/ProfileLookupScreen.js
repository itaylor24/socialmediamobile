import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, FlatList} from 'react-native';
import CreateShout from '../Shouts/CreateShout';
import { useTheme, useFocusEffect} from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import { lookupWithToken } from '../../utils/lookup';
import { AuthContext } from '../../utils';
import { useContext, useEffect, useState } from 'react';
import { ProfileBadge } from '../Profiles';
import { useIsFocused } from '@react-navigation/native';
import Shout from '../Shouts/Shout';

export default function ProfileLookupScreen(props){

    const {colors} = useTheme(); 
    const {navigation, route} = props; 
    const {username} = route.params; 
    const {userToken} = useContext(AuthContext); 
    const [profileSet, setProfileDidSet] = useState(false); 
    const [profileObj, setProfileObj] = useState(null); 
    const isFocused = useIsFocused(); 
    const [shouts, setShouts] = useState(null); 
    const [actionProfile, setActionProfile] = useState(null)


    const styles = StyleSheet.create({
        appContainer: {
          //flex:1 ,
          //padding: 20,
          paddingTop: 20,
          paddingBottom: 0,
          alignItems: 'center', 
          width: "100%"
          
        },
        text:{
            color: colors.text
        },
        fab: {
            position: 'absolute',
            margin: 16,
            right: 10,
            bottom: 10,
            backgroundColor:'rgb(140, 80, 255)',

        },
        flatList: {
            marginTop: 10,
            width: "100%"
        },
        noShouts:{
            color: colors.text, 
            fontSize: 20, 
            fontWeight: 'bold',
            marginTop: 100, 
        }
        
      });

      /*useEffect(()=>{
        
        
            const handleProfileLookup= (data)=>{
           
                console.log(data,userName, userToken); 
                setProfileObj(data); 
            
            }
            
            if(userToken){

                
                lookupWithToken('GET', `https://itaylor24.pythonanywhere.com/api/profiles/${userName}/`,handleProfileLookup,userToken); 

            }
            

           
            
        
        
        
    },[]); */ 
    useEffect(()=>{
        
        if(isFocused === true){
            const handleProfileLookup= (data)=>{
       
                //console.log(data,userName, userToken); 
                
                setProfileObj(data); 
                setActionProfile(data); 
                
            }
            const handleShoutsLookup=(data)=>{
                setShouts(data.results); 

            }
            
            if(userToken){
                console.log(username); 
                lookupWithToken('GET', `https://itaylor24.pythonanywhere.com/api/profiles/${username}/`,handleProfileLookup,userToken); 
                lookupWithToken('GET', `https://itaylor24.pythonanywhere.com/api/shouts/?username=${username}`,handleShoutsLookup,userToken); 
               
    
            }
        }
        
        

       
        
    
    
    
    },[isFocused])

    const handleFollow = (data, status)=>{
        setActionProfile(data); 
    }


    return (
        
        <View style={styles.appContainer}>
            <ProfileBadge profile={actionProfile} didPerformAction={handleFollow} navigation={navigation}/>
            {(shouts && shouts.length === 0) ? <Text style={styles.noShouts}>No Shouts Yet</Text>:<FlatList showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false} style={styles.flatList} data={shouts} renderItem={({item})=>{return <Shout navigation={navigation} shout={item}/>}}/>}
        </View>
      
    ); 
}

