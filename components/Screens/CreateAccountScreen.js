import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';
import CreateShout from '../Shouts/CreateShout';
import { AuthContext } from '../../utils';
import { useContext } from 'react';
import { useTheme, useFocusEffect} from '@react-navigation/native';
import { backendLookup} from '../../utils/lookup';
import { useForm, Controller } from 'react-hook-form';

export default function CreateAccountScreen(props){

    const {navigation} = props; 
    const {signUp, updateUserName} = useContext(AuthContext); 
    const {colors} = useTheme(); 
    const {control, handleSubmit, errors, reset, setFocus} = useForm({
        defaultValues: {
            'username':'',
            'password':'', 
            'email':'',
            'displayname': '', 
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

      const getToken = (username, password, email, displayname)=>{

      
        
        function handleToken(data,status){
            //console.log(data.token); 
            //console.log(data.token);
            if(status === 200){
                signUp(data.token);
                console.log(data); 
                updateUserName(username); 
                navigation.navigate("App"); 
            } 
            
        }
            
        console.log({"username":username, "password":password,"email":email, 'displayname': displayname})
        backendLookup('POST', 'https://itaylor24.pythonanywhere.com/api/accounts/create-account/',handleToken,{"username":username, "password":password,"email":email, 'displayname': displayname}); 
            
            
            
        
        
        
    }

    const submitForm = (data)=>{
        const {username, password, email, displayname} = data; 
        

        if(username==="" || password===""){
            console.log("INPUT ALL FIELDS"); 
        }else{
                
            
            getToken(username,password,email,displayname); 
            

            console.log(data); 
        }

      
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.appContainer}>
      
            <View style={{marginBottom:340}}>
                <Controller control={control} name="username" render={({field:{onChange, value}})=>(

                    <TextInput rules={{ required: true }} placeholder="Username" style={styles.textInput} autoFocus={true}  onChangeText={value=>onChange(value)}/>
                    )} />
                <Controller control={control} name="displayname" render={({field:{onChange, value}})=>(

                        <TextInput rules={{ required: true }} placeholder="Display Name" style={styles.textInput} autoFocus={true}  onChangeText={value=>onChange(value)}/>
                        )} />

                

                <Controller control={control} name="password" render={({field:{onChange, value}})=>(

                    <TextInput  rules={{ required: true }} secureTextEntry={true} placeholder="Password" style={styles.textInput} onChangeText={value=>onChange(value)}/>
                    )} />

                        
                <Controller control={control} name="email" render={({field:{onChange, value}})=>(

                <TextInput placeholder="Email (Optional)" style={styles.textInput} onChangeText={value=>onChange(value)}/>
                )} />
            
                <Button color = {colors.primary} onPress={handleSubmit(submitForm)} title="Sign Up"/>
                </View>  

           
        
        </View>
        </TouchableWithoutFeedback>
    ); 
}

