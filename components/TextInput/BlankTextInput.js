import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Avatar , Badge} from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

export function BlankTextInput(props){
    
    const placeholder = props.placeholder; 
    const autofocus = props.autofocus; 
    const userInitials = props.userInitials; 
    const username = props.username; 

    const {colors} = useTheme(); 
    

    const styles = StyleSheet.create({
        

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
        <View>
            
            <View  style={styles.textContainer}>
                <View style={styles.userContainer}>
                    <Avatar.Icon size={35} icon="account"></Avatar.Icon>
                    <Text style={styles.username}>{username}</Text>
                </View>
                <View style={styles.textContainer}>

                    <TextInput maxLength= {props.maxLength} multiline={true} placeholder={placeholder}  placeholderTextColor={colors.muted} autoFocus = {autofocus} style={styles.textInput} />
                </View>
    
            </View>
        </View>
    ); 
}
