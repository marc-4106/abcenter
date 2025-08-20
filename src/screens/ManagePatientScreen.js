import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { collection, query, orderBy, limit, onSnapshot, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import AddPatientModal from '../components/AddPatientModal';
import ViewPatientModal from '../components/ViewPatientModal'; // 🔹 Import the new modal

export default function ManagePatient() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  
  // 🔹 Use separate state for each modal
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Fetch recent 20 when not searching
  useEffect(() => {
    const q = query(collection(db, 'patients'), orderBy('createdAt', 'desc'), limit(20));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPatients(list);
    });
    return unsubscribe;
  }, []);

  const handleSearch = async (text) => {
    setSearch(text);

    if (text.trim() === '') {
      const q = query(collection(db, 'patients'), orderBy('createdAt', 'desc'), limit(20));
      const snap = await getDocs(q);
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPatients(list);
      return;
    }

    const searchText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    const firstNameQuery = query(collection(db, 'patients'), where('firstName', '>=', searchText), where('firstName', '<=', searchText + '\uf8ff'));
    const lastNameQuery = query(collection(db, 'patients'), where('lastName', '>=', searchText), where('lastName', '<=', searchText + '\uf8ff'));

    const [firstSnap, lastSnap] = await Promise.all([getDocs(firstNameQuery), getDocs(lastNameQuery)]);

    const results = [
      ...firstSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      ...lastSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    ];

    const uniqueResults = Array.from(new Map(results.map(item => [item.id, item])).values());
    setPatients(uniqueResults);
  };

  const handleNewPatient = () => {
    setSelectedPatient(null);
    setAddModalVisible(true);
  };

  const handleUpdate = (patient) => {
    setSelectedPatient(patient);
    setAddModalVisible(true);
  };

  // 🔹 New function to handle view button press
  const handleView = (patient) => {
    setSelectedPatient(patient);
    setViewModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.name}>{item.lastName}, {item.firstName}</Text>
        <Text style={styles.subText}>Age: {item.age} | Gender: {item.gender}</Text>
      </View>
      {/* 🔹 View and Update buttons side-by-side */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewBtn} onPress={() => handleView(item)}>
          <Text style={styles.btnText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateBtn} onPress={() => handleUpdate(item)}>
          <Text style={styles.btnText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search by First or Last Name"
        value={search}
        onChangeText={handleSearch}
      />

      <Pressable style={styles.newBtn} onPress={handleNewPatient}>
        <Text style={styles.newBtnText}>New Patient</Text>
      </Pressable>

      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* Modal for Add/Update */}
      <AddPatientModal
        isVisible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        patientData={selectedPatient}
        mode={selectedPatient ? "update" : "add"}
      />

      {/* 🔹 Modal for Viewing */}
      <ViewPatientModal
        isVisible={viewModalVisible}
        onClose={() => setViewModalVisible(false)}
        patientData={selectedPatient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  search: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  name: { fontSize: 16, fontWeight: 'bold' },
  subText: { fontSize: 14, color: '#666' },
  buttonContainer: { flexDirection: 'row' }, // 🔹 New style for button group
  updateBtn: { backgroundColor: '#007BFF', padding: 8, borderRadius: 5, marginLeft: 8 }, // 🔹 Updated style
  viewBtn: { backgroundColor: '#28A745', padding: 8, borderRadius: 5 }, // 🔹 New style for view button
  btnText: { color: '#fff', fontWeight: 'bold' }, // 🔹 New generic style for button text
  newBtn: { backgroundColor: 'green', padding: 12, borderRadius: 5, marginBottom: 10, alignItems: 'center' },
  newBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});