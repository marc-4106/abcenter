import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

export default function ViewPatientModal({ isVisible, onClose, patientData }) {
  if (!patientData) {
    return null;
  }

  // Helper function to render a list of items
  const renderList = (title, items) => {
    if (!items || items.length === 0) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{title}</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            {Object.entries(item).map(([key, value]) => (
              <Text key={key} style={styles.itemText}>
                <Text style={styles.itemLabel}>{key}: </Text>
                {value}
              </Text>
            ))}
          </View>
        ))}
      </View>
    );
  };

  // Helper function to render key-value pairs
  const renderKeyValue = (title, data) => {
    if (!data || Object.keys(data).length === 0) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>{title}</Text>
        {Object.entries(data).map(([key, value]) => (
          <Text key={key} style={styles.itemText}>
            <Text style={styles.itemLabel}>{key}: </Text>
            {value}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Patient Details</Text>

          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Personal Information</Text>
            <Text style={styles.itemText}><Text style={styles.itemLabel}>Name: </Text>{patientData.firstName} {patientData.lastName}</Text>
            <Text style={styles.itemText}><Text style={styles.itemLabel}>Age: </Text>{patientData.age}</Text>
            <Text style={styles.itemText}><Text style={styles.itemLabel}>Gender: </Text>{patientData.gender}</Text>
            <Text style={styles.itemText}><Text style={styles.itemLabel}>Contact No.: </Text>{patientData.contactNo}</Text>
            <Text style={styles.itemText}><Text style={styles.itemLabel}>Address: </Text>{patientData.address}</Text>
          </View>

          {/* Exposure History */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Exposure History</Text>
            <Text style={styles.itemText}><Text style={styles.itemLabel}>Date of Exposure: </Text>{patientData.dateOfExposure}</Text>
            <Text style={styles.itemText}><Text style={styles.itemLabel}>Place of Exposure: </Text>{patientData.placeOfExposure}</Text>
            <Text style={styles.itemText}><Text style={styles.itemLabel}>Type of Exposure: </Text>{patientData.typeOfExposure}</Text>
            <Text style={styles.itemText}><Text style={styles.itemLabel}>Type of Animal: </Text>{patientData.typeOfAnimal}</Text>
            <Text style={styles.itemText}><Text style={styles.itemLabel}>Animal Condition: </Text>{patientData.animalCondition}</Text>
            <Text style={styles.itemText}><Text style={styles.itemLabel}>Category: </Text>{patientData.category}</Text>
          </View>

          {/* Vaccine Given */}
          {renderKeyValue('Vaccine Given', patientData.vaccineGiven)}

          {/* Shots & Boosters */}
          {renderList('Shots', patientData.shots)}
          {renderList('Booster Shots', patientData.boosters)}

        </ScrollView>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: Dimensions.get('window').height * 0.9,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
  itemRow: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  closeBtn: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});