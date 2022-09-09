import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';
import CreateShout from '../Shouts/CreateShout';
import { useTheme } from 'react-navigation';

export default function CreateShoutScreen(props){
    const {navigation} = props; 

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.appContainer}>
          <View style={styles.createShoutContainer}>
            <CreateShout username="Isaac Taylor" navigation = {navigation}></CreateShout>
          </View>
        </View>
      </TouchableWithoutFeedback>
    ); 
}

const styles = StyleSheet.create({
    appContainer: {
      flex:1 ,

      padding: 30, 
      alignItems: 'center', 
      justifyContent: 'center',
      
    },
    createShoutContainer:{
      flex:1,
      alignSelf: 'stretch'
    }
  });