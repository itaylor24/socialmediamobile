import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../../utils";
import { lookupWithToken } from "../../utils/lookup";
export const BoostButton = (props) => {
  const [boosted, setBoosted] = useState(false);
  const {shout, didPerformAction} = props; 
  
  const { colors } = useTheme(); 
  const {userToken} = useContext(AuthContext); 

  const handleBoost = (boosted) =>{

    if(!boosted){
        lookupWithToken('POST', 'https://itaylor24.pythonanywhere.com/api/shouts/action/',handleBoostAPI,userToken,{id: shout.id, action: 'boost'}); 
        console.log('boosting'); 
    }
    if(boosted){
        lookupWithToken('POST', 'https://itaylor24.pythonanywhere.com/api/shouts/action/',handleBoostAPI,userToken,{id: shout.id, action: 'unboost'}); 
        console.log('unboosting'); 
    }
    
  }

  useEffect(()=>{
    setBoosted(shout.is_boosted); 
  },[shout])

  const handleBoostAPI = (data, status)=>{
    if(status===201){
        console.log(data.boosted_shout); 
        didPerformAction(data.boosted_shout,status); 
    }
    else if(status===200){
        console.log(data); 
        didPerformAction(data,status); 
    }else{
        console.log(status); 
    }
  }

  return (
    <Pressable onPress={() => handleBoost(boosted)}>
      <MaterialCommunityIcons
        name={boosted ? "star-shooting" : "star-shooting-outline"}
        size={32}
        color={boosted ? colors.secondary : colors.text}
      />
    </Pressable>
  );
};