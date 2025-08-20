import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const exposureTypes = ['Bite', 'Scratch'];
const animalTypes = ['Dog', 'Cat'];
const animalConditions = ['Healthy', 'Sicked', 'Lost/Missing', 'Died', 'Sacrifice'];
const categories = ['I', 'II', 'III'];

const Step2Exposure = ({ formData, onInputChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>2. Exposure History & Category</Text>
      
      <Text style={styles.label}>Date of Exposure</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onInputChange('dateOfExposure', text)}
        value={formData.dateOfExposure}
        placeholder="YYYY-MM-DD"
      />
      
      <Text style={styles.label}>Place of Exposure</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onInputChange('placeOfExposure', text)}
        value={formData.placeOfExposure}
      />

      <Text style={styles.label}>Type of Exposure</Text>
      <View style={styles.checkboxGroup}>
        {exposureTypes.map((type) => (
          <BouncyCheckbox
            key={type}
            size={20}
            fillColor="#007BFF"
            unfillColor="#FFFFFF"
            text={type}
            onPress={() => onInputChange('typeOfExposure', type)}
            isChecked={formData.typeOfExposure === type}
            textStyle={styles.checkboxText}
          />
        ))}
      </View>

      <Text style={styles.label}>Type of Animal</Text>
      <View style={styles.checkboxGroup}>
        {animalTypes.map((type) => (
          <BouncyCheckbox
            key={type}
            size={20}
            fillColor="#007BFF"
            unfillColor="#FFFFFF"
            text={type}
            onPress={() => onInputChange('typeOfAnimal', type)}
            isChecked={formData.typeOfAnimal === type}
            textStyle={styles.checkboxText}
          />
        ))}
      </View>
      
      <Text style={styles.label}>Condition of Animal</Text>
      <View style={styles.checkboxGroup}>
        {animalConditions.map((condition) => (
          <BouncyCheckbox
            key={condition}
            size={20}
            fillColor="#007BFF"
            unfillColor="#FFFFFF"
            text={condition}
            onPress={() => onInputChange('animalCondition', condition)}
            isChecked={formData.animalCondition === condition}
            textStyle={styles.checkboxText}
          />
        ))}
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.checkboxGroup}>
        {categories.map((category) => (
          <BouncyCheckbox
            key={category}
            size={20}
            fillColor="#007BFF"
            unfillColor="#FFFFFF"
            text={`Category ${category}`}
            onPress={() => onInputChange('category', category)}
            isChecked={formData.category === category}
            textStyle={styles.checkboxText}
          />
        ))}
      </View>
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
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    justifyContent: 'flex-start',
  },
  checkboxText: {
    textDecorationLine: 'none',
    color: '#333',
  },
});

export default Step2Exposure;