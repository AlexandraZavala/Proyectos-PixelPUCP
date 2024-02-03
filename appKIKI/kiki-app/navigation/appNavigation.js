import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from '../App/Screens/LoginScreen/Login';
import SignUp from '../App/Screens/SignUp/SignUp';
import Profile from '../App/Screens/ProfileScreen/Profile';
const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Profile" options={{headerShown: false}} component={Profile} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}