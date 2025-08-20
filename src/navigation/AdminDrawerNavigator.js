// AdminDrawerNavigator.js
import React, { useContext, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomAdminDrawer from '../components/CustomAdminDrawer';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UserManagementScreen from '../screens/UserManagementScreen';
import AddPatientScreen from '../screens/AddPatientScreen';
import ManagePatientScreen from '../screens/ManagePatientScreen'

const Drawer = createDrawerNavigator();

export default function AdminDrawerNavigator() {
  const { role } = useContext(AuthContext);
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);

  const toggleDrawerCollapse = () => {
    setIsDrawerCollapsed(prevState => !prevState);
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomAdminDrawer
          {...props}
          isCollapsed={isDrawerCollapsed}
          toggleCollapse={toggleDrawerCollapse}
        />
      )}
      screenOptions={{
        headerShown: true,
        drawerType: 'permanent',
        drawerStyle: {
          width: isDrawerCollapsed ? 60 : 200,
        },
        // This is the key change to remove the hamburger button
        headerLeft: () => null,
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
       <Drawer.Screen
        name="ManagePatient"
        component={ManagePatientScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="account-plus" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Reports"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="chart-bar" size={size} color={color} />
          ),
        }}
      />

      {role === 'superadmin' && (
        <Drawer.Screen
          name="Users"
          component={UserManagementScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="account-group" size={size} color={color} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}