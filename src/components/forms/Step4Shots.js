import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const getDays = (category) => {
  if (category === 'I') return ['Day 0', 'Day 7', 'Day 28'];
  if (category === 'II' || category === 'III') return ['Day 0', 'Day 3', 'Day 7', 'Day 14', 'Day 28'];
  return [];
};

const Step4Shots = ({ formData, onInputChange }) => {
  const handleShotsChange = (index, field, value) => {
    const newShots = [...formData.shots];
    newShots[index] = { ...newShots[index], [field]: value };
    onInputChange('shots', newShots);
  };

  const handleBoosterChange = (index, field, value) => {
    const newBoosters = [...formData.boosters];
    newBoosters[index] = { ...newBoosters[index], [field]: value };
    onInputChange('boosters', newBoosters);
  };

  const addBooster = () => {
    onInputChange('boosters', [...formData.boosters, { day: 'Day 0', date: '', typeOfVaccine: '', dose: '', routeAndSite: '', nurse: '', branch: '' }]);
  };

  const removeBooster = (index) => {
    const newBoosters = [...formData.boosters];
    newBoosters.splice(index, 1);
    onInputChange('boosters', newBoosters);
  };

  const days = getDays(formData.category);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>4. Shots</Text>

      <View style={styles.vaccinatedToggle}>
        <Text style={styles.label}>Already Vaccinated?</Text>
        <BouncyCheckbox
          size={20}
          fillColor="#007BFF"
          unfillColor="#FFFFFF"
          text="Yes"
          onPress={(isChecked) => onInputChange('isVaccinated', isChecked)}
          isChecked={formData.isVaccinated}
          textStyle={styles.checkboxText}
        />
      </View>

      {formData.category && (
        <>
          <Text style={styles.subHeader}>
            {formData.category === 'I' ? 'Pre-Exposure' : 'Post-Exposure'} Prophylaxis
          </Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.dayCell]}>Days</Text>
            <Text style={styles.cell}>Date</Text>
            <Text style={styles.cell}>Type</Text>
            <Text style={styles.cell}>Dose</Text>
            <Text style={styles.cell}>Route</Text>
            <Text style={styles.cell}>Nurse</Text>
            <Text style={styles.cell}>Branch</Text>
          </View>
          {days.map((day, index) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.cell, styles.dayCell]}>{day}</Text>
              <TextInput style={styles.cell} onChangeText={(text) => handleShotsChange(index, 'date', text)} value={formData.shots[index]?.date} placeholder="Date" />
              <TextInput style={styles.cell} onChangeText={(text) => handleShotsChange(index, 'typeOfVaccine', text)} value={formData.shots[index]?.typeOfVaccine} placeholder="Type" />
              <TextInput style={styles.cell} onChangeText={(text) => handleShotsChange(index, 'dose', text)} value={formData.shots[index]?.dose} placeholder="Dose" />
              <TextInput style={styles.cell} onChangeText={(text) => handleShotsChange(index, 'routeAndSite', text)} value={formData.shots[index]?.routeAndSite} placeholder="Route/Site" />
              <TextInput style={styles.cell} onChangeText={(text) => handleShotsChange(index, 'nurse', text)} value={formData.shots[index]?.nurse} placeholder="Nurse" />
              <TextInput style={styles.cell} onChangeText={(text) => handleShotsChange(index, 'branch', text)} value={formData.shots[index]?.branch} placeholder="Branch" />
            </View>
          ))}
        </>
      )}

      {formData.isVaccinated && (
        <View>
          <Text style={styles.subHeader}>Booster Shots</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.dayCell]}>Days</Text>
            <Text style={styles.cell}>Date</Text>
            <Text style={styles.cell}>Type</Text>
            <Text style={styles.cell}>Dose</Text>
            <Text style={styles.cell}>Route</Text>
            <Text style={styles.cell}>Nurse</Text>
            <Text style={styles.cell}>Branch</Text>
            <Text style={[styles.cell, styles.removeHeaderCell]}>Rem</Text>
          </View>
          {formData.boosters.map((booster, index) => (
            <View key={index} style={styles.row}>
              <TextInput style={[styles.cell, styles.dayCell]} onChangeText={(text) => handleBoosterChange(index, 'day', text)} value={booster.day} placeholder="Day" />
              <TextInput style={styles.cell} onChangeText={(text) => handleBoosterChange(index, 'date', text)} value={booster.date} placeholder="Date" />
              <TextInput style={styles.cell} onChangeText={(text) => handleBoosterChange(index, 'typeOfVaccine', text)} value={booster.typeOfVaccine} placeholder="Type" />
              <TextInput style={styles.cell} onChangeText={(text) => handleBoosterChange(index, 'dose', text)} value={booster.dose} placeholder="Dose" />
              <TextInput style={styles.cell} onChangeText={(text) => handleBoosterChange(index, 'routeAndSite', text)} value={booster.routeAndSite} placeholder="Route/Site" />
              <TextInput style={styles.cell} onChangeText={(text) => handleBoosterChange(index, 'nurse', text)} value={booster.nurse} placeholder="Nurse" />
              <TextInput style={styles.cell} onChangeText={(text) => handleBoosterChange(index, 'branch', text)} value={booster.branch} placeholder="Branch" />
              <TouchableOpacity style={styles.removeBtnContainer} onPress={() => removeBooster(index)}>
                <Text style={styles.removeBtnText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={addBooster}
          >
            <Text style={styles.addButtonText}>Add Booster</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  subHeader: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 10, color: '#555' },
  vaccinatedToggle: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  label: { fontSize: 16, color: '#555', marginRight: 10 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f0f0f0', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ddd' },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 5, alignItems: 'center' },
  cell: { flex: 1, fontSize: 12, paddingHorizontal: 5, textAlign: 'center' },
  dayCell: { flex: 0.5, fontWeight: 'bold' },
  addButton: { marginTop: 20, backgroundColor: '#007BFF', padding: 12, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  checkboxText: { textDecorationLine: 'none' },
  removeHeaderCell: { flex: 0.2, textAlign: 'center' },
  removeBtnContainer: { flex: 0.2, alignItems: 'center', justifyContent: 'center' },
  removeBtnText: {
    color: '#fff',
    backgroundColor: '#dc3545',
    borderRadius: 12,
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default Step4Shots;