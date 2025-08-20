// components/CustomAdminDrawer.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomAdminDrawer(props) {
  const { logout, user, role } = useContext(AuthContext); // get user + role from context
  const { isCollapsed, toggleCollapse } = props;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      
      {/* Drawer Header */}
      <View style={styles.header}>
        <View>
          {!isCollapsed && (
            <>
              <Text style={styles.headerText}>Admin Panel</Text>
              <Text style={styles.userInfo}>
                {user?.displayName || user?.email || 'Guest'}
              </Text>
              <Text style={styles.userRole}>
                {role || 'No role'}
              </Text>
            </>
          )}
        </View>
        <TouchableOpacity onPress={toggleCollapse} style={styles.collapseButton}>
          <Icon
            name={isCollapsed ? 'chevron-right' : 'chevron-left'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Drawer Items */}
      <DrawerItemList
        {...props}
        labelStyle={isCollapsed ? styles.hiddenLabel : styles.visibleLabel}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Icon name="logout" size={24} color="red" />
          {!isCollapsed && <Text style={styles.logoutText}>Logout</Text>}
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#1976d2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  userRole: {
    color: '#bbdefb',
    fontSize: 12,
  },
  collapseButton: {
    padding: 5,
  },
  footer: {
    marginTop: 'auto',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  hiddenLabel: {
    width: 0, // hides text labels when collapsed
  },
  visibleLabel: {
    // normal style
  },
});
