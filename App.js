import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AdminNavigator from './src/admin/navigation/AdminLoginNavigator';
import UserNavigator from './src/users/navigation/UserLoginNavigator';

export default function App() {
  const isWeb = Platform.OS === 'web';

  return (
    <NavigationContainer>
      {isWeb ? <AdminNavigator /> : <UserNavigator />}
    </NavigationContainer>
  );
}