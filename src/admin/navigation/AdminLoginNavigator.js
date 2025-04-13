import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/AdminLoginScreen'
import HomeScreen from '../screens/AdminHomeScreen';

const Stack = createNativeStackNavigator();

const AdminLoginNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
  
};

export default AdminLoginNavigator;
