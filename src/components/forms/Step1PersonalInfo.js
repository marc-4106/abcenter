// src/components/forms/Step1PersonalInfo.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// 🔹 New props: formData and onInputChange
const Step1PersonalInfo = ({ formData, onInputChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>1. Personal Information</Text>
      
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onInputChange('lastName', text)}
        value={formData.lastName}
      />

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onInputChange('firstName', text)}
        value={formData.firstName}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onInputChange('age', text)}
        value={formData.age}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(itemValue) => onInputChange('gender', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Contact No.</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onInputChange('contactNo', text)}
        value={formData.contactNo}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onInputChange('address', text)}
        value={formData.address}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (unchanged styles)
  container: { width: '100%' },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  label: { fontSize: 16, color: '#555', marginBottom: 5 },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  picker: { height: '100%', width: '100%' },
});

export default Step1PersonalInfo;