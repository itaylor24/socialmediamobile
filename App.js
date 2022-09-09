import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, useColorScheme} from 'react-native';
import { PrimaryTextInput, BlankTextInput } from './components/TextInput';
import  CreateShout  from './components/Shouts/CreateShout';
import { CreateShoutScreen, SignInScreen, CreateAccountScreen, HomeScreen, DiscoverScreen, ProfileScreen, SearchScreen, SettingsScreen, LoginScreen, ProfileLookupScreen, ShoutLookupScreen} from './components/Screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { useEffect, useState, useMemo} from 'react';
import { AuthContext } from './utils';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider,IconButton, Drawer} from 'react-native-paper';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {useTheme} from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { MainCustomDrawer } from './components/Drawers';


const MyLightTheme = {
  ...DefaultTheme,
  ...PaperDefaultTheme,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    secondary: 'rgb(140, 80, 255)',
    muted: 'gray',

  },
};

const MyDarkTheme = {
  ...DarkTheme,
  ...PaperDarkTheme,
  version: 3,
  colors: {
    ...DarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
    secondary: 'rgb(140, 80, 255)',
    background: 'rgb(10,10,10)',
    card: 'rgb(20,20,20)',
    muted: 'gray',
    
  },
};



const AuthStack = createStackNavigator(); 
const Tabs = createBottomTabNavigator(); 
const HomeStack = createStackNavigator(); 
const MainStack = createStackNavigator(); 
const MainDrawer = createDrawerNavigator(); 
const RootStack = createStackNavigator(); 
const LoginStack = createStackNavigator(); 

const MainStackNavigator = ()=>{
  const {colors} = useTheme(); 
  return(
  <Tabs.Navigator  screenOptions={{
    tabBarStyle: { height: 100 },

    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.text, 
    unmountOnBlur: true

  }}>
    

    <Tabs.Screen name="DiscoverScreen" component={DiscoverScreen} options={{
      title: "Discover", 
      tabBarShowLabel: false, 
      headerShown:false,
      tabBarIcon: (options) =>{ return (<Icon name="earth" color={options.color} size={40}/>)}
      }} ></Tabs.Screen>
    
  <Tabs.Screen name="SearchScreen" component={SearchScreen} options={{
      title: "Search",
      tabBarShowLabel: false, 
      headerShown:false,
      tabBarIcon: (options) =>{ return (<Icon name="magnify" color={options.color}  size={40}/>)},
      }} ></Tabs.Screen>
    <Tabs.Screen name="HomeScreen" component={HomeStackNavigator} options={{
      
      title: "Home", 
      headerShown:false,
      tabBarShowLabel: false,
    tabBarIcon: (options) =>{ return (<Icon name="home" color={options.color} size={40}/>)}
  }}></Tabs.Screen>
    <Tabs.Screen name="ProfileScreen" component={ProfileScreen} options={{
      title: "Profile",
      tabBarShowLabel: false, 
      headerShown:false,
      tabBarIcon: (options) =>{ return (<Icon name="account" color={options.color} size={40}/>)}
      }} ></Tabs.Screen>
    
  </Tabs.Navigator>)
}

const HomeStackNavigator = () =>{

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title: "Home",
        headerShown:false,
      }}>
        </HomeStack.Screen>
      
    </HomeStack.Navigator>
  )
}

/*const HomeDrawerScreen = ()=>{
  return (
    <MainStack.Screen name="MainScreen" component={MainStackNavigator} options={{headerShown:false}} ></MainStack.Screen>
    
  </MainStack.Navigator>)
}*/



const CustomDrawerNavigator = ()=>{
  const {colors} = useTheme(); 

  return(
  <MainDrawer.Navigator screenOptions={{
    headerTintColor: colors.secondary,
    headerTitleStyle: {
      color: colors.text,
    },
  
  }}
    drawerContent={(props) => <MainCustomDrawer {...props} />}>
              <MainDrawer.Screen name ="HomeDrawer" component={MainStackNavigator} options={{title: "Social Network"}} ></MainDrawer.Screen>
              <MainDrawer.Screen name ="SettingsDrawer" component={SettingsScreen} options={{title: "Settings"}}  ></MainDrawer.Screen>
  </MainDrawer.Navigator>); 

}
const AuthScreen = ()=>{
  return (
    <AuthStack.Navigator>
          <AuthStack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown: false, title: "Sign In"}} ></AuthStack.Screen>
          <AuthStack.Screen name="CreateAccountScreen" component={CreateAccountScreen} options={{title: "Create Account"}}></AuthStack.Screen>
          <AuthStack.Screen name="LoginScreen" component={LoginScreen} options={{title: "Log In"}}></AuthStack.Screen>
      </AuthStack.Navigator>
  )
}
const AppScreen = ()=>{
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="HomeScreen" component={CustomDrawerNavigator} options={{headerShown:false, title:"Home"}} ></MainStack.Screen>
      <MainStack.Screen name="CreateShoutScreen" component={CreateShoutScreen} options={{headerShown:false}} ></MainStack.Screen>
      <MainStack.Screen name="ProfileLookupScreen" component={ProfileLookupScreen} options={{title: "Social Network"}}></MainStack.Screen>
      <MainStack.Screen name="ShoutLookupScreen" component={ShoutLookupScreen} options={{title: "Social Network"}}></MainStack.Screen>
    </MainStack.Navigator>
  )
}
export default function App() {

  const [userToken, setUserToken] = useState(null); 
  const [userName, setUserName] = useState(null); 
  const scheme = useColorScheme();
  const { colors } = useTheme(); 
  
  useEffect(() => {
    console.log(userToken,"TOKENFROM APP"); 
    console.log(userName, "USERNAME");
  },[userName,userToken])

  const authContext = useMemo(()=>{
  

    return {
      signIn: (token)=>{
        setUserToken(token); 
      },
      signUp:(token)=>{
        setUserToken(token);  
      }, 
      signOut:()=>{
        setUserToken(null);  
        setUserName(null); 
      },
      userToken: userToken,
      userName: userName, 
      updateUserName:(username)=>{
        setUserName(username); 
      }
    }

  },[userToken,userName])

  const currTheme = scheme === 'dark' ? MyDarkTheme : MyLightTheme

  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
    <AuthContext.Provider value={authContext}>
      <PaperProvider theme={currTheme}>
      <NavigationContainer theme={currTheme}>

        <RootStack.Navigator screenOptions={{headerShown:false}}>
        <RootStack.Screen name="Auth" component={AuthScreen}>

        </RootStack.Screen>
          <RootStack.Screen name="App" component={AppScreen}>

          </RootStack.Screen>

        </RootStack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>

    </IconComponentProvider>
    

  );
}




