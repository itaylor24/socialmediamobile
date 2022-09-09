import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';
import CreateShout from '../Shouts/CreateShout';
import { AuthContext } from '../../utils';
import { useContext, useEffect, useState } from 'react';
import { useTheme, useFocusEffect} from '@react-navigation/native';
import { backendLookup} from '../../utils/lookup';
import { useForm, Controller } from 'react-hook-form';

export default function LoginScreen(props){

    const {navigation} = props; 
    const {signIn, updateUserName} = useContext(AuthContext); 
    const {colors} = useTheme(); 
    const {control, handleSubmit, errors, reset, setFocus} = useForm({
        defaultValues: {
            'username':'',
            'email': '', 
            'password':'' 

        }
    })
    


    const styles = StyleSheet.create({
        appContainer: {
          flex:1 ,
    
          padding: 30, 
          paddingTop: 50,
          alignItems: 'center', 
          justifyContent: 'center',
          
        },
        text:{
            color: colors.text
        },
        textInput:{
            borderColor: '#cccccc',
            borderWidth: 1,
            padding: 15, 
            width: 300, 
            marginTop: 10,
            marginBottom: 10, 
            fontSize: 15,
            borderRadius: 20,
            color: colors.text
        }
        
      });

      const getToken = (username, password)=>{

      
        
        function handleToken(data, status){
            //console.log(data.token); 
            //console.log(data.token); 
            if(status === 200){
                signIn(data.token);
                updateUserName(username); 

                navigation.navigate("App"); 
            }
            
        }
            
            
        backendLookup('POST', 'https://itaylor24.pythonanywhere.com/mobile-login/',handleToken,{"username":username, "password":password}); 
            
            
            
        
        
        
    }

    const submitForm = (data)=>{
        const {username, password} = data; 
        

        if(username==="" || password===""){
            console.log("INPUT ALL FIELDS"); 
        }else{
             
            
            getToken(username,password); 
            

            console.log(data); 
        }

      
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.appContainer}>
            
    
                <View style={{marginBottom:230}}>
                <Controller control={control} name="username" render={({field:{onChange, value}})=>(

                    <TextInput rules={{ required: true }} placeholder="Username" style={styles.textInput} autoFocus={true}  onChangeText={value=>onChange(value)}/>
                    )} />


                <Controller control={control} name="password" render={({field:{onChange, value}})=>(

                    <TextInput  rules={{ required: true }} secureTextEntry={true} placeholder="Password" style={styles.textInput} onChangeText={value=>onChange(value)}/>
                    )} />
                    
                        
                    
            
                <Button color = {colors.primary} onPress={handleSubmit(submitForm)} title="Sign In"/>
                </View>  
        </View>
        </TouchableWithoutFeedback>
      
    ); 
}
