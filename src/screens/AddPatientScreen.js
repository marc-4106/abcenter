import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  ScrollView, useWindowDimensions, Pressable, ActivityIndicator
} from 'react-native';

// --- Firebase Imports ---
import { auth, db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';

export default function AddPatientScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Personal Information
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  // History of Exposure
  const [dateOfExposure, setDateOfExposure] = useState('');
  const [placeOfExposure, setPlaceOfExposure] = useState('');
  const [exposureType, setExposureType] = useState('');
  const [otherExposureText, setOtherExposureText] = useState('');
  const [animalCondition, setAnimalCondition] = useState('');

  // Category
  const [category, setCategory] = useState('');

  // Vaccine Given
  const [antiRabies, setAntiRabies] = useState('');
  const [pvrv, setPvrv] = useState('');
  const [pcec, setPcec] = useState('');
  const [erigHrig, setErigHrig] = useState('');
  const [tetanusProphylaxis, setTetanusProphylaxis] = useState('');
  const [tetanusToxiod, setTetanusToxiod] = useState('');
  const [ats, setAts] = useState('');
  const [htig, setHtig] = useState('');

  // Conditional rendering states
  const [hasPreExposure, setHasPreExposure] = useState(false);
  const [hasPostExposure, setHasPostExposure] = useState(false);
  const [hasBooster, setHasBooster] = useState(false);

  // Pre-Exposure
  const [prevacDay0Date, setPrevacDay0Date] = useState('');
  const [prevacDay0Type, setPrevacDay0Type] = useState('');
  const [prevacDay0Dose, setPrevacDay0Dose] = useState('');
  const [prevacDay0Route, setPrevacDay0Route] = useState('');
  const [prevacDay0GivenBy, setPrevacDay0GivenBy] = useState('');
  const [prevacDay7Date, setPrevacDay7Date] = useState('');
  const [prevacDay7Type, setPrevacDay7Type] = useState('');
  const [prevacDay7Dose, setPrevacDay7Dose] = useState('');
  const [prevacDay7Route, setPrevacDay7Route] = useState('');
  const [prevacDay7GivenBy, setPrevacDay7GivenBy] = useState('');
  const [prevacDay28Date, setPrevacDay28Date] = useState('');
  const [prevacDay28Type, setPrevacDay28Type] = useState('');
  const [prevacDay28Dose, setPrevacDay28Dose] = useState('');
  const [prevacDay28Route, setPrevacDay28Route] = useState('');
  const [prevacDay28GivenBy, setPrevacDay28GivenBy] = useState('');

  // Post Exposure
  const [postVacDay0Date, setPostVacDay0Date] = useState('');
  const [postVacDay0Type, setPostVacDay0Type] = useState('');
  const [postVacDay0Dose, setPostVacDay0Dose] = useState('');
  const [postVacDay0Route, setPostVacDay0Route] = useState('');
  const [postVacDay0GivenBy, setPostVacDay0GivenBy] = useState('');
  const [postVacDay3Date, setPostVacDay3Date] = useState('');
  const [postVacDay3Type, setPostVacDay3Type] = useState('');
  const [postVacDay3Dose, setPostVacDay3Dose] = useState('');
  const [postVacDay3Route, setPostVacDay3Route] = useState('');
  const [postVacDay3GivenBy, setPostVacDay3GivenBy] = useState('');
  const [postVacDay7Date, setPostVacDay7Date] = useState('');
  const [postVacDay7Type, setPostVacDay7Type] = useState('');
  const [postVacDay7Dose, setPostVacDay7Dose] = useState('');
  const [postVacDay7Route, setPostVacDay7Route] = useState('');
  const [postVacDay7GivenBy, setPostVacDay7GivenBy] = useState('');
  const [postVacDay14Date, setPostVacDay14Date] = useState('');
  const [postVacDay14Type, setPostVacDay14Type] = useState('');
  const [postVacDay14Dose, setPostVacDay14Dose] = useState('');
  const [postVacDay14Route, setPostVacDay14Route] = useState('');
  const [postVacDay14GivenBy, setPostVacDay14GivenBy] = useState('');
  const [postVacDay28Date, setPostVacDay28Date] = useState('');
  const [postVacDay28Type, setPostVacDay28Type] = useState('');
  const [postVacDay28Dose, setPostVacDay28Dose] = useState('');
  const [postVacDay28Route, setPostVacDay28Route] = useState('');
  const [postVacDay28GivenBy, setPostVacDay28GivenBy] = useState('');

  // Booster
  const [boosterDay0Date, setBoosterDay0Date] = useState('');
  const [boosterDay0Type, setBoosterDay0Type] = useState('');
  const [boosterDay0Dose, setBoosterDay0Dose] = useState('');
  const [boosterDay0Route, setBoosterDay0Route] = useState('');
  const [boosterDay0GivenBy, setBoosterDay0GivenBy] = useState('');
  const [boosterDay3Date, setBoosterDay3Date] = useState('');
  const [boosterDay3Type, setBoosterDay3Type] = useState('');
  const [boosterDay3Dose, setBoosterDay3Dose] = useState('');
  const [boosterDay3Route, setBoosterDay3Route] = useState('');
  const [boosterDay3GivenBy, setBoosterDay3GivenBy] = useState('');

  const RadioButton = ({ label, value, selectedValue, onSelect }) => (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={() => onSelect(value)}>
      <View style={styles.radioButton}>
        {selectedValue === value && <View style={styles.radioButtonInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const DatePicker = ({ value, onSelect, style }) => (
    <input
      type="date"
      value={value}
      onChange={(e) => onSelect(e.target.value)}
      style={StyleSheet.flatten([styles.input, style, styles.webDateInput])}
    />
  );

  const handleAddPatient = async () => {
    if (!lastName || !firstName || !age || !gender) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setIsSaving(true);

      const patientData = {
        lastName, firstName, middleInitial, age, gender, contactNumber, address,
        dateOfExposure, placeOfExposure, exposureType, otherExposureText, animalCondition,
        category, antiRabies, pvrv, pcec, erigHrig, tetanusProphylaxis, tetanusToxiod, ats, htig,
        hasPreExposure, prevacDay0Date, prevacDay0Type, prevacDay0Dose, prevacDay0Route, prevacDay0GivenBy,
        prevacDay7Date, prevacDay7Type, prevacDay7Dose, prevacDay7Route, prevacDay7GivenBy,
        prevacDay28Date, prevacDay28Type, prevacDay28Dose, prevacDay28Route, prevacDay28GivenBy,
        hasPostExposure, postVacDay0Date, postVacDay0Type, postVacDay0Dose, postVacDay0Route, postVacDay0GivenBy,
        postVacDay3Date, postVacDay3Type, postVacDay3Dose, postVacDay3Route, postVacDay3GivenBy,
        postVacDay7Date, postVacDay7Type, postVacDay7Dose, postVacDay7Route, postVacDay7GivenBy,
        postVacDay14Date, postVacDay14Type, postVacDay14Dose, postVacDay14Route, postVacDay14GivenBy,
        postVacDay28Date, postVacDay28Type, postVacDay28Dose, postVacDay28Route, postVacDay28GivenBy,
        hasBooster, boosterDay0Date, boosterDay0Type, boosterDay0Dose, boosterDay0Route, boosterDay0GivenBy,
        boosterDay3Date, boosterDay3Type, boosterDay3Dose, boosterDay3Route, boosterDay3GivenBy,
        createdBy: userId,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "patients"), patientData);

      alert("Patient saved successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Failed to save patient. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        signInAnonymously(auth).catch(console.error);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Patient</Text>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007BFF" />
            <Text style={styles.loadingText}>Initializing...</Text>
          </View>
        ) : (
          userId && (
            <Text style={styles.userIdText}>
              User ID: {userId}
            </Text>
          )
        )}
      </View>

      {!isLoading && (
        <View style={styles.formContainer}>
          {/* Section 1: Personal Information */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>1. Personal Information</Text>
            <View style={isLargeScreen ? styles.responsiveRow : null}>
              <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
              <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
              <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Middle Initial" value={middleInitial} onChangeText={setMiddleInitial} />
              <TextInput
                style={[styles.input, isLargeScreen && styles.responsiveInput]}
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.label}>Gender:</Text>
            <View style={styles.radioGroup}>
              <RadioButton label="Male" value="Male" selectedValue={gender} onSelect={setGender} />
              <RadioButton label="Female" value="Female" selectedValue={gender} onSelect={setGender} />
            </View>
            <View style={isLargeScreen ? styles.responsiveRow : null}>
              <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Contact Number" value={contactNumber} onChangeText={setContactNumber} />
              <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Address" value={address} onChangeText={setAddress} />
            </View>
          </View>

          {/* Section 2: History of Exposure */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>2. History of Exposure</Text>
            <View style={isLargeScreen ? styles.responsiveRow : null}>
              <DatePicker
                value={dateOfExposure}
                onSelect={setDateOfExposure}
                placeholder="Date of Exposure"
                style={[isLargeScreen && styles.responsiveInput]}
              />
              <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Place of Exposure" value={placeOfExposure} onChangeText={setPlaceOfExposure} />
            </View>
            <Text style={styles.label}>Type of Exposure:</Text>
            <View style={styles.radioGroup}>
              <RadioButton label="Bite" value="Bite" selectedValue={exposureType} onSelect={setExposureType} />
              <RadioButton label="Scratch" value="Scratch" selectedValue={exposureType} onSelect={setExposureType} />
              <RadioButton label="Others" value="Others" selectedValue={exposureType} onSelect={setExposureType} />
            </View>
            {exposureType === 'Others' && (
              <TextInput style={styles.input} placeholder="Specify other type of exposure" value={otherExposureText} onChangeText={setOtherExposureText} />
            )}
            <Text style={styles.label}>Condition of Animal:</Text>
            <View style={styles.radioGroup}>
              <RadioButton label="Healthy" value="Healthy" selectedValue={animalCondition} onSelect={setAnimalCondition} />
              <RadioButton label="Sicked" value="Sicked" selectedValue={animalCondition} onSelect={setAnimalCondition} />
              <RadioButton label="Lost/Missing" value="Lost/Missing" selectedValue={animalCondition} onSelect={setAnimalCondition} />
              <RadioButton label="Died" value="Died" selectedValue={animalCondition} onSelect={setAnimalCondition} />
              <RadioButton label="Sacrifice" value="Sacrifice" selectedValue={animalCondition} onSelect={setAnimalCondition} />
            </View>
          </View>

          {/* Section 3: Category */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>3. Category</Text>
            <View style={styles.radioGroup}>
              <RadioButton label="I" value="I" selectedValue={category} onSelect={setCategory} />
              <RadioButton label="II" value="II" selectedValue={category} onSelect={setCategory} />
              <RadioButton label="III" value="III" selectedValue={category} onSelect={setCategory} />
            </View>
          </View>

          {/* Section 4: Vaccine Given */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>4. Vaccine Given</Text>
            {isLargeScreen ? (
              <View style={styles.responsiveRow}>
                <View style={styles.leftColumn}>
                  <TextInput style={styles.input} placeholder="Anti-Rabies" value={antiRabies} onChangeText={setAntiRabies} />
                  <TextInput style={styles.input} placeholder="PVRV" value={pvrv} onChangeText={setPvrv} />
                  <TextInput style={styles.input} placeholder="PCEC" value={pcec} onChangeText={setPcec} />
                  <TextInput style={styles.input} placeholder="ERIG/HRIG" value={erigHrig} onChangeText={setErigHrig} />
                </View>
                <View style={styles.rightColumn}>
                  <TextInput style={styles.input} placeholder="Tetanus Prophylaxis" value={tetanusProphylaxis} onChangeText={setTetanusProphylaxis} />
                  <TextInput style={styles.input} placeholder="Tetanus Toxiod" value={tetanusToxiod} onChangeText={setTetanusToxiod} />
                  <TextInput style={styles.input} placeholder="ATS" value={ats} onChangeText={setAts} />
                  <TextInput style={styles.input} placeholder="HTIG" value={htig} onChangeText={setHtig} />
                </View>
              </View>
            ) : (
              <View>
                <TextInput style={styles.input} placeholder="Anti-Rabies" value={antiRabies} onChangeText={setAntiRabies} />
                <TextInput style={styles.input} placeholder="PVRV" value={pvrv} onChangeText={setPvrv} />
                <TextInput style={styles.input} placeholder="PCEC" value={pcec} onChangeText={setPcec} />
                <TextInput style={styles.input} placeholder="ERIG/HRIG" value={erigHrig} onChangeText={setErigHrig} />
                <TextInput style={styles.input} placeholder="Tetanus Prophylaxis" value={tetanusProphylaxis} onChangeText={setTetanusProphylaxis} />
                <TextInput style={styles.input} placeholder="Tetanus Toxiod" value={tetanusToxiod} onChangeText={setTetanusToxiod} />
                <TextInput style={styles.input} placeholder="ATS" value={ats} onChangeText={setAts} />
                <TextInput style={styles.input} placeholder="HTIG" value={htig} onChangeText={setHtig} />
              </View>
            )}
          </View>

          {/* Section 5: Pre-Exposure Vaccination Record */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>5. Pre-Exposure Vaccination Record</Text>
            <View style={styles.radioGroup}>
              <RadioButton label="Yes" value={true} selectedValue={hasPreExposure} onSelect={setHasPreExposure} />
              <RadioButton label="No" value={false} selectedValue={hasPreExposure} onSelect={setHasPreExposure} />
            </View>
            {hasPreExposure && (
              <View>
                <Text style={styles.subSectionTitle}>Day 0</Text>
                <View style={isLargeScreen ? styles.responsiveRow : null}>
                  <DatePicker
                    value={prevacDay0Date}
                    onSelect={setPrevacDay0Date}
                    placeholder="Date"
                    style={[isLargeScreen && styles.responsiveInput]}
                  />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Type of Vaccine" value={prevacDay0Type} onChangeText={setPrevacDay0Type} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Dose" value={prevacDay0Dose} onChangeText={setPrevacDay0Dose} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Route & Site" value={prevacDay0Route} onChangeText={setPrevacDay0Route} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Given By" value={prevacDay0GivenBy} onChangeText={setPrevacDay0GivenBy} />
                </View>
                <Text style={styles.subSectionTitle}>Day 7</Text>
                <View style={isLargeScreen ? styles.responsiveRow : null}>
                  <DatePicker
                    value={prevacDay7Date}
                    onSelect={setPrevacDay7Date}
                    placeholder="Date"
                    style={[isLargeScreen && styles.responsiveInput]}
                  />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Type of Vaccine" value={prevacDay7Type} onChangeText={setPrevacDay7Type} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Dose" value={prevacDay7Dose} onChangeText={setPrevacDay7Dose} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Route & Site" value={prevacDay7Route} onChangeText={setPrevacDay7Route} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Given By" value={prevacDay7GivenBy} onChangeText={setPrevacDay7GivenBy} />
                </View>
                <Text style={styles.subSectionTitle}>Day 28</Text>
                <View style={isLargeScreen ? styles.responsiveRow : null}>
                  <DatePicker
                    value={prevacDay28Date}
                    onSelect={setPrevacDay28Date}
                    placeholder="Date"
                    style={[isLargeScreen && styles.responsiveInput]}
                  />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Type of Vaccine" value={prevacDay28Type} onChangeText={setPrevacDay28Type} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Dose" value={prevacDay28Dose} onChangeText={setPrevacDay28Dose} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Route & Site" value={prevacDay28Route} onChangeText={setPrevacDay28Route} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Given By" value={prevacDay28GivenBy} onChangeText={setPrevacDay28GivenBy} />
                </View>
              </View>
            )}
          </View>

          {/* Section 6: Post Vaccination Record */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>6. Post Vaccination Record</Text>
            <View style={styles.radioGroup}>
              <RadioButton label="Yes" value={true} selectedValue={hasPostExposure} onSelect={setHasPostExposure} />
              <RadioButton label="No" value={false} selectedValue={hasPostExposure} onSelect={setHasPostExposure} />
            </View>
            {hasPostExposure && (
              <View>
                <Text style={styles.subSectionTitle}>Day 0</Text>
                <View style={isLargeScreen ? styles.responsiveRow : null}>
                  <DatePicker
                    value={postVacDay0Date}
                    onSelect={setPostVacDay0Date}
                    placeholder="Date"
                    style={[isLargeScreen && styles.responsiveInput]}
                  />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Type of Vaccine" value={postVacDay0Type} onChangeText={setPostVacDay0Type} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Dose" value={postVacDay0Dose} onChangeText={setPostVacDay0Dose} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Route & Site" value={postVacDay0Route} onChangeText={setPostVacDay0Route} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Given By" value={postVacDay0GivenBy} onChangeText={setPostVacDay0GivenBy} />
                </View>
                <Text style={styles.subSectionTitle}>Day 3</Text>
                <View style={isLargeScreen ? styles.responsiveRow : null}>
                  <DatePicker
                    value={postVacDay3Date}
                    onSelect={setPostVacDay3Date}
                    placeholder="Date"
                    style={[isLargeScreen && styles.responsiveInput]}
                  />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Type of Vaccine" value={postVacDay3Type} onChangeText={setPostVacDay3Type} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Dose" value={postVacDay3Dose} onChangeText={setPostVacDay3Dose} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Route & Site" value={postVacDay3Route} onChangeText={setPostVacDay3Route} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Given By" value={postVacDay3GivenBy} onChangeText={setPostVacDay3GivenBy} />
                </View>
                <Text style={styles.subSectionTitle}>Day 7</Text>
                <View style={isLargeScreen ? styles.responsiveRow : null}>
                  <DatePicker
                    value={postVacDay7Date}
                    onSelect={setPostVacDay7Date}
                    placeholder="Date"
                    style={[isLargeScreen && styles.responsiveInput]}
                  />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Type of Vaccine" value={postVacDay7Type} onChangeText={setPostVacDay7Type} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Dose" value={postVacDay7Dose} onChangeText={setPostVacDay7Dose} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Route & Site" value={postVacDay7Route} onChangeText={setPostVacDay7Route} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Given By" value={postVacDay7GivenBy} onChangeText={setPostVacDay7GivenBy} />
                </View>
                <Text style={styles.subSectionTitle}>Day 14</Text>
                <View style={isLargeScreen ? styles.responsiveRow : null}>
                  <DatePicker
                    value={postVacDay14Date}
                    onSelect={setPostVacDay14Date}
                    placeholder="Date"
                    style={[isLargeScreen && styles.responsiveInput]}
                  />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Type of Vaccine" value={postVacDay14Type} onChangeText={setPostVacDay14Type} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Dose" value={postVacDay14Dose} onChangeText={setPostVacDay14Dose} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Route & Site" value={postVacDay14Route} onChangeText={setPostVacDay14Route} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Given By" value={postVacDay14GivenBy} onChangeText={setPostVacDay14GivenBy} />
                </View>
                <Text style={styles.subSectionTitle}>Day 28</Text>
                <View style={isLargeScreen ? styles.responsiveRow : null}>
                  <DatePicker
                    value={postVacDay28Date}
                    onSelect={setPostVacDay28Date}
                    placeholder="Date"
                    style={[isLargeScreen && styles.responsiveInput]}
                  />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Type of Vaccine" value={postVacDay28Type} onChangeText={setPostVacDay28Type} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Dose" value={postVacDay28Dose} onChangeText={setPostVacDay28Dose} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Route & Site" value={postVacDay28Route} onChangeText={setPostVacDay28Route} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Given By" value={postVacDay28GivenBy} onChangeText={setPostVacDay28GivenBy} />
                </View>
              </View>
            )}
          </View>

          {/* Section 7: Booster */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>7. Booster</Text>
            <View style={styles.radioGroup}>
              <RadioButton label="Yes" value={true} selectedValue={hasBooster} onSelect={setHasBooster} />
              <RadioButton label="No" value={false} selectedValue={hasBooster} onSelect={setHasBooster} />
            </View>
            {hasBooster && (
              <View>
                <Text style={styles.subSectionTitle}>Day 0</Text>
                <View style={isLargeScreen ? styles.responsiveRow : null}>
                  <DatePicker
                    value={boosterDay0Date}
                    onSelect={setBoosterDay0Date}
                    placeholder="Date"
                    style={[isLargeScreen && styles.responsiveInput]}
                  />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Type of Vaccine" value={boosterDay0Type} onChangeText={setBoosterDay0Type} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Dose" value={boosterDay0Dose} onChangeText={setBoosterDay0Dose} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Route & Site" value={boosterDay0Route} onChangeText={setBoosterDay0Route} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Given By" value={boosterDay0GivenBy} onChangeText={setBoosterDay0GivenBy} />
                </View>
                <Text style={styles.subSectionTitle}>Day 3</Text>
                <View style={isLargeScreen ? styles.responsiveRow : null}>
                  <DatePicker
                    value={boosterDay3Date}
                    onSelect={setBoosterDay3Date}
                    placeholder="Date"
                    style={[isLargeScreen && styles.responsiveInput]}
                  />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Type of Vaccine" value={boosterDay3Type} onChangeText={setBoosterDay3Type} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Dose" value={boosterDay3Dose} onChangeText={setBoosterDay3Dose} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Route & Site" value={boosterDay3Route} onChangeText={setBoosterDay3Route} />
                  <TextInput style={[styles.input, isLargeScreen && styles.responsiveInput]} placeholder="Given By" value={boosterDay3GivenBy} onChangeText={setBoosterDay3GivenBy} />
                </View>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.pressableButton,
                isLargeScreen ? styles.pressableButtonLarge : styles.pressableButtonSmall,
                (isSaving || !userId) && styles.pressableButtonDisabled, // Disabled when saving or no user ID
                pressed && styles.pressableButtonPressed,
              ]}
              onPress={handleAddPatient}
              disabled={isSaving || !userId}
            >
              {isSaving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Add Patient</Text>
              )}
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7', // Light gray background
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  userIdText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
    fontFamily: 'monospace',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  loadingText: {
    marginLeft: 8,
    color: '#007BFF',
    fontSize: 12,
  },
  formContainer: {
    width: '100%',
    maxWidth: 900,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
    color: '#555',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 10,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  responsiveRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '48%',
  },
  rightColumn: {
    width: '48%',
  },
  responsiveInput: {
    width: '48%',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  pressableButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  pressableButtonSmall: {
    width: '100%',
  },
  pressableButtonLarge: {
    width: '50%',
  },
  pressableButtonPressed: {
    backgroundColor: '#0056b3', // Darker blue when pressed
  },
  pressableButtonDisabled: {
    backgroundColor: '#ccc', // Gray background when disabled
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  webDateInput: {
    boxSizing: 'border-box',
    fontFamily: 'System, sans-serif',
  }
});
