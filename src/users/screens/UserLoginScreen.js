import React, { useState } from 'react';
import { Alert } from 'react-native';
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const UserLoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful!', 'You are now logged in.');
      navigation.replace('Home'); 
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the City of Smile</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.optionsRow}>
        <Pressable onPress={() => alert('Forgot Password')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </Pressable>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleLogin}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <View style ={styles.regLinkContainer}>
        <Text style={styles.forgotText}>Not a member?</Text>
        <Pressable  onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.forgotText}>Register now</Text>
        </Pressable>
      </View>
      <View style ={styles.regLinkContainer}>
        <Text style={styles.forgotText}>or continue with</Text>
      </View>
      <View style={styles.socialContainer}>
  <Pressable style={styles.googleButton} onPress={() => alert('Google')}>
    <Image
      source={{
        uri: 'https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png',
      }}
      style={styles.logoIcon}
    />
    <Text style={styles.socialText}>Google</Text>
  </Pressable>

  <Pressable style={styles.facebookButton} onPress={() => alert('Facebook')}>
    <Image
      source={{
        uri: 'https://wallpapers.com/images/hd/facebook-logo-icon-mcvl4u1utgmpp34f.png',
      }}
      style={styles.logoIcon}
    />
    <Text style={styles.facebookButtonText}>Facebook</Text>
  </Pressable>
</View>

    </View>
    
  );
};

export default UserLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F0F0FF',
  },
  title: { 
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#A55591'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 15,
    borderRadius: 5,
    maxWidth: 600,
    width: '80%',
  },

  button: {
    backgroundColor: '#A55591',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    width: 600,
    maxWidth: '60%',
    marginBottom:35,
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
    width: '80%',
    maxWidth: 600,
    marginBottom: 30,
    justifyContent: 'flex-end',
  },
  forgotText: {
    color: '#A55591',
    fontSize: 16,
    justifyContent: 'flex-end',
  },
  regLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    maxWidth: 600,
    marginBottom: 30,
  },
  socialContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15, // spacing between buttons
  },
  
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '60%',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    justifyContent: 'center',
  },
  
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1877F2',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '60%',
    justifyContent: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  
  logoIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  
  socialText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  
  facebookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  
});


