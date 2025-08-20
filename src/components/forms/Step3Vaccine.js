import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const vaccines = ['AntiRabies', 'PVRV', 'PCEC', 'ERIG/HRIG', 'Tetanus Prophylaxis', 'Tetanus Toxoid', 'ATS', 'HTIG'];

const Step3Vaccine = ({ formData, onInputChange }) => {
  const handleVaccineChange = (vaccineName, value) => {
    onInputChange('vaccineGiven', {
      ...formData.vaccineGiven,
      [vaccineName]: value
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>3. Vaccine Given</Text>
      {vaccines.map((vaccine, index) => (
        <View key={index}>
          <Text style={styles.label}>{vaccine}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleVaccineChange(vaccine, text)}
            value={formData.vaccineGiven[vaccine]}
            placeholder={`Enter details for ${vaccine}`}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Step3Vaccine;