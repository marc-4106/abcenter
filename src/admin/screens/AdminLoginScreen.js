import React, { useState } from 'react';
import { Alert } from 'react-native';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';


const AdminLoginScreen = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);

  const toggleRememberMe = () => setRememberMe(!rememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Get user role from Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.role === 'admin') {
          window.alert("Login Successful!");
          navigation.replace("Home");
        } else {
          window.alert("Access Denied", "You are not authorized as an admin.");
        }
      } else {
        window.alert("User data not found.");
      }
  
    } catch (error) {
      window.alert("Login Failed", error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput placeholder="Email" style={styles.input}
      autoCapitalize="none"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      />
      <TextInput placeholder="Password" secureTextEntry style={styles.input}
      value={password}
      onChangeText={setPassword}
      />
      <View style={styles.optionsRow}>
      <Pressable onPress={toggleRememberMe} style={styles.rememberRow}>
        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
          {rememberMe && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.rememberText}>Remember Me</Text>
      </Pressable>
  <Pressable onPress={() => alert('Forgot Password')}>
    <Text style={styles.forgotText}>Forgot Password?</Text>
  </Pressable>
  </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </View>
  );
};
export default AdminLoginScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    maxWidth: 600,
    width: '80%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 10,
    borderRadius: 4,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 16,
  },
  rememberText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 600,
    maxWidth: '80%',
  },
  buttonPressed: {
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    maxWidth: 600,
    marginBottom: 20,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotText: {
    color: '#007bff',
    fontSize: 16,
  },
});


