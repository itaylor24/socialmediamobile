import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';
import CreateShout from '../Shouts/CreateShout';
import { useTheme } from '@react-navigation/native';

export default function SettingsScreen(props){
    const {colors} = useTheme(); 

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
        fab: {
            position: 'absolute',
            margin: 16,
            right: 10,
            bottom: 10,
            backgroundColor:'rgb(140, 80, 255)',

        },
      });

    return (
        
        <View style={styles.appContainer}>
            <Text style = {styles.text}>Settings Screen</Text>
            
        </View>

    ); 
}