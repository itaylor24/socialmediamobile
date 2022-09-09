import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

export function PrimaryTextInput(props){
    const placeholder = props.placeholder; 
    return (
        <View style={styles.textContainer}>
            <TextInput placeholder={placeholder}/>
        </View>
    ); 
}

const styles = StyleSheet.create({
    textContainer: {
        borderColor: '#cccccc',
        borderWidth: 1,
        padding: 5, 
        marginTop: 10,
        marginBottom: 10, 
    }
  });