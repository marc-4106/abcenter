import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { db } from '../services/firebase';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';

// Form Components
import Step1PersonalInfo from './forms/Step1PersonalInfo';
import Step2Exposure from './forms/Step2Exposure';
import Step3Vaccine from './forms/Step3Vaccine';
import Step4Shots from './forms/Step4Shots';

const { width } = Dimensions.get('window');

const initialFormData = {
  lastName: '',
  firstName: '',
  age: '',
  gender: 'Male',
  contactNo: '',
  address: '',
  dateOfExposure: '',
  placeOfExposure: '',
  typeOfExposure: '',
  typeOfAnimal: '',
  animalCondition: '',
  category: '',
  vaccineGiven: {},
  isVaccinated: false,
  shots: [],
  boosters: [],
};

export default function AddPatientModal({ isVisible, onClose, patientData = {}, mode = "add" }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isVisible) {
      setFormData({ ...initialFormData, ...patientData });
      setCurrentStep(1);
    }
  }, [isVisible, patientData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handleSave();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log("Saving to Firestore:", formData);

    try {
      if (mode === "update" && patientData.id) {
        const patientRef = doc(db, 'patients', patientData.id);
        await setDoc(patientRef, formData, { merge: true });
        Alert.alert("Success", "Patient updated successfully!");
      } else {
        await addDoc(collection(db, 'patients'), {
          ...formData,
          createdAt: new Date(),
        });
        Alert.alert("Success", "Patient added successfully!");
      }
      onClose();
    } catch (error) {
      console.error("Error saving patient data:", error);
      Alert.alert("Error", "Error saving patient data. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo formData={formData} onInputChange={handleInputChange} />;
      case 2:
        return <Step2Exposure formData={formData} onInputChange={handleInputChange} />;
      case 3:
        return <Step3Vaccine formData={formData} onInputChange={handleInputChange} />;
      case 4:
        return <Step4Shots formData={formData} onInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      avoidKeyboard
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>
            {mode === "update" ? "Update Patient" : "Add Patient"}
          </Text>
          <View style={styles.stepIndicatorContainer}>
            <View style={[styles.stepIndicator, currentStep === 1 && styles.activeStep]} />
            <View style={[styles.stepIndicator, currentStep === 2 && styles.activeStep]} />
            <View style={[styles.stepIndicator, currentStep === 3 && styles.activeStep]} />
            <View style={[styles.stepIndicator, currentStep === 4 && styles.activeStep]} />
          </View>
          {renderStep()}
        </ScrollView>
        <View style={styles.buttonContainer}>
          {currentStep > 1 && (
            <TouchableOpacity onPress={handlePrevious} style={[styles.button, styles.prevButton]}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleNext}
            style={[styles.button, styles.nextButton]}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{currentStep === 4 ? "Save" : "Next"}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // ... (unchanged styles)
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#f8f9fa',
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
    color: '#333',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  stepIndicator: {
    width: 60,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeStep: {
    backgroundColor: '#007BFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 15,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
  },
  prevButton: {
    backgroundColor: '#6c757d',
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});