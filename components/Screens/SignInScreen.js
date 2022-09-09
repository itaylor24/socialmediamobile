import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';
import CreateShout from '../Shouts/CreateShout';
import { AuthContext } from '../../utils';
import { useContext } from 'react';
import { useTheme } from '@react-navigation/native';

export default function SignInScreen(props){

    const {navigation} = props; 
    const { signIn } = useContext(AuthContext); 
    const {colors} = useTheme(); 
    const styles = StyleSheet.create({
      appContainer: {
        flex:.8 ,
  
        padding: 30, 
        paddingTop: 50,
        alignItems: 'center', 
        justifyContent: 'center',
        
      },
      createShoutContainer:{
        flex:1,
        alignSelf: 'stretch'
      },
      headerText:{
        color: colors.text, 
        fontSize: 60, 
        fontWeight: 'bold', 
        marginBottom: 30,
        textAlign: 'center'
      }
    });

    return (
        
        <View style={styles.appContainer}>
            <Text style={styles.headerText}>Social Network</Text>
            <Button color = {colors.primary} onPress= { ()=>{ navigation.push("LoginScreen")}} title="Sign In"/>
            <Button color = {colors.primary} onPress= {()=>navigation.push("CreateAccountScreen")} title="Create Account"/>
        </View>
      
    ); 
}

