import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { BlankTextInput } from '../TextInput';
import { Card, withTheme, Avatar, FAB} from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../../utils';
import { useContext , createRef} from 'react';
import { backendLookup, lookupWithToken } from '../../utils/lookup';
import { useForm , Controller} from 'react-hook-form';

export default function CreateShout(props){



    const {navigation, username} = props; 
    const {colors} = useTheme()
    const {userName, userToken} = useContext(AuthContext); 
    const textAreaRef = createRef(); 
    const {control, handleSubmit, errors, reset, setFocus} = useForm({
        defaultValues: {
            'content': ''

        }
    })

    const handleShout = (data, status)=>{
        if(status === 201){
            navigation.goBack(); 
        }
    }   

    


const styles = StyleSheet.create({
    shoutCreate:{
        flex: 1,

    },
    shoutCreateContainer: {


        padding: 15, 
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'space-between',
        alignSelf: 'stretch',

    },

    card:{
        flex: 1,
        alignSelf:'stretch',
        borderColor: '#cccccc', 
        borderTopWidth: 1, 
        padding: 5,

    },
    textInput: {
    },
    buttonRow: {
        padding: 10,
        flex: .1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    fab:{

        width:55,  
        height: 55,   
        borderRadius: 30,                          
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10, 
        textAlign: 'center'
    }, 
    textContainer: {
            
        marginTop: 10,
        marginBottom: 10, 
    },
    textInput:{
        color: colors.text,
        marginTop: 15
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    username:{
        color: colors.text,
        marginLeft: 10
    }

  });

    return (
            <View style={styles.shoutCreate}>
                <View style={styles.buttonRow}>
                    <Button color={colors.muted} title="Cancel" onPress = {()=>navigation.pop()}/>
                    <Button color= {colors.secondary} title="Shout" onPress = {handleSubmit((data)=>{
                        const {content} = data; 
                     
                        console.log(content); 
                        lookupWithToken('POST', 'https://itaylor24.pythonanywhere.com/api/shouts/create/',handleShout,userToken,{content:content}); 

                    })}/>
                </View>
                <View style={styles.card}>
                    
                    <View style={styles.shoutCreateContainer}>
                        <View style={styles.textInput}>
                     
            
                            <View  style={styles.textContainer}>
                                <View style={styles.userContainer}>
                                    <Avatar.Icon size={35} icon="account"></Avatar.Icon>
                                    <Text style={styles.username}>{userName}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                <Controller control={control} name="content" render={({field:{onChange, value}})=>(

                                    <TextInput onChangeText={value=>onChange(value)} rules={{ required: true }} maxLength= {100} multiline={true} 
                                    placeholder="What's on your mind?"  placeholderTextColor={colors.muted} autoFocus = {true} style={styles.textInput} />
                                    )} />
                                   
                                </View>
                        
                            </View>
                
                            
                        </View>
                    </View>
                    
                </View>
            </View>
    ); 
}


