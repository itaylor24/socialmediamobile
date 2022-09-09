import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem, 
  } from '@react-navigation/drawer';
import { AuthContext } from '../../utils';
import { useContext } from 'react';
export function MainCustomDrawer(props) {
    const {navigation} = props; 
    const {signOut} = useContext(AuthContext); 


    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sign Out"
          onPress={() => {
            navigation.navigate("SignInScreen"); 
            signOut(); 
        }}
        />
      </DrawerContentScrollView>
    );
  }