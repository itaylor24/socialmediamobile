import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, FlatList} from 'react-native';
import CreateShout from '../Shouts/CreateShout';
import { useContext } from 'react';
import { AuthContext } from '../../utils';
import { ScreenContainer } from 'react-native-screens';
import { useTheme, useIsFocused} from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import { backendLookup, lookupWithToken } from '../../utils/lookup';
import Shout from '../Shouts/Shout';
import { useState, useEffect } from 'react';


export default function ShoutLookupScreen(props){


    //const [shoutsInit, setShoutsInit] = useState([]); 
    const [shout, setShout] = useState(null); 
    //const [shoutsDidSet, setShoutsDidSet] = useState(false); 
    const {navigation, route} = props; 
    const {userToken} = useContext(AuthContext); 
    const {id} = route.params; 
    const {colors} = useTheme(); 
    const isFocused = useIsFocused();
    
    
    /*useEffect(()=>{
        
        if(shoutsDidSet === false){
            const handleShoutListLookup = (data)=>{
           
                setShouts(data.results);
                //console.log(shouts); 
                setShoutsDidSet(true); 
         
            
            }
            
            if(userToken){

                
                lookupWithToken('GET', 'https://itaylor24.pythonanywhere.com/api/shouts/feed/',handleShoutListLookup,userToken); 

            }
            

           
            
        }
        
        
    },[shoutsInit, shoutsDidSet, setShoutsDidSet,shouts]); */ 
    useEffect(()=>{
        
        if(isFocused === true){
            const handleShoutLookup = (data)=>{
                console.log(data); 
                setShout(data);
                
         
            
            }
            
            if(userToken){

                
                lookupWithToken('GET', `https://itaylor24.pythonanywhere.com/api/shouts/${id}/`,handleShoutLookup,userToken); 

            }
            

           
            
        }
        
        
    },[isFocused])



    const styles = StyleSheet.create({
        appContainer: {
            //flex: 1,
            //padding: 30, 
            height: "100%",
            //alignItems: 'center', 
            //justifyContent: 'center',

        
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
        flatList:{

            flex:1,
            height: "90%",
            //paddingLeft: 20,
            //paddingRight: 20, 

 

        },
        noShouts:{
            color: colors.text,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }
        
    });


    return (

            <View style={styles.appContainer}>
 
                {shout && <Shout navigation={navigation} shout={shout}/>}
                <FAB icon="plus" style={styles.fab} onPress={()=>navigation.push("CreateShoutScreen")} size="large" />
            </View>

      
    ); 
}
