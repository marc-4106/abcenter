import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/AdminLoginScreen';
import DrawerNav from './AdminDrawerNavigator';


const Stack = createNativeStackNavigator();

const AdminLoginNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="AdminLogin" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="AdminDrawer" component={DrawerNav} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AdminLoginNavigator;
