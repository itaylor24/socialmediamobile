import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, FlatList} from 'react-native';
import CreateShout from '../Shouts/CreateShout';
import { useTheme, useIsFocused} from '@react-navigation/native';
import { Colors } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { AuthContext } from '../../utils';
import { useContext, useEffect, useState } from 'react';
import { lookupWithToken } from '../../utils/lookup';
import Shout from '../Shouts/Shout';

export default function DiscoverScreen(props){

    const {colors} = useTheme(); 
    const {navigation} = props; 
    const [shoutsInit, setShoutsInit] = useState([]); 
    const [shouts, setShouts] = useState([]); 
    const [shoutsDidSet, setShoutsDidSet] = useState(false); 
    const {userToken} = useContext(AuthContext); 
    const isFocused = useIsFocused();

    const styles = StyleSheet.create({
        appContainer: {
          height: "100%"
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

 

        }
      });

      /*useEffect(()=>{
        
        if(shoutsDidSet === false){
            const handleShoutListLookup = (data)=>{
           
                setShouts(data.results);
                //console.log(shouts); 
                setShoutsDidSet(true); 
         
            
            }
            
            if(userToken){

                
                lookupWithToken('GET', 'https://itaylor24.pythonanywhere.com/api/shouts/',handleShoutListLookup,userToken); 

            }
            
 
           
            
        }
        
        
    },[shoutsInit, shoutsDidSet, setShoutsDidSet,shouts]); */ 

    useEffect(()=>{
        
        if(isFocused === true){
            const handleShoutListLookup = (data)=>{
                
                setShouts(data.results);
                
                setShoutsDidSet(true); 
         
            
            }
            
            if(userToken){

                
                lookupWithToken('GET', 'https://itaylor24.pythonanywhere.com/api/shouts/',handleShoutListLookup,userToken); 

            }
            
 
           
            
        }
        
        
    },[isFocused]); 


    return (
        
        <View style={styles.appContainer}>
             <FlatList showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false} style={styles.flatList} data={shouts} renderItem={({item})=>{return <Shout navigation={navigation} shout={item}/>}}/>
                <FAB icon="plus" style={styles.fab} onPress={()=>navigation.push("CreateShoutScreen")} size="large" />
        </View>
      
    ); 
}

