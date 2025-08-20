import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, query, orderBy, limit, onSnapshot, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

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
      // Show recent 20 if search is cleared
      const q = query(collection(db, 'patients'), orderBy('createdAt', 'desc'), limit(20));
      const snap = await getDocs(q);
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPatients(list);
      return;
    }

    // Search by firstName or lastName
    const searchText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    const firstNameQuery = query(
      collection(db, 'patients'),
      where('firstName', '>=', searchText),
      where('firstName', '<=', searchText + '\uf8ff')
    );
    const lastNameQuery = query(
      collection(db, 'patients'),
      where('lastName', '>=', searchText),
      where('lastName', '<=', searchText + '\uf8ff')
    );

    const [firstSnap, lastSnap] = await Promise.all([getDocs(firstNameQuery), getDocs(lastNameQuery)]);

    const results = [
      ...firstSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      ...lastSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    ];

    // Remove duplicates
    const uniqueResults = Array.from(new Map(results.map(item => [item.id, item])).values());
    setPatients(uniqueResults);
  };

  const handleUpdate = (patient) => {
    navigation.navigate('UpdatePatient', { patientId: patient.id, patientData: patient });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.name}>{item.lastName}, {item.firstName}</Text>
        <Text style={styles.subText}>Age: {item.age} | Gender: {item.gender}</Text>
      </View>
      <TouchableOpacity style={styles.updateBtn} onPress={() => handleUpdate(item)}>
        <Text style={styles.updateText}>Update</Text>
      </TouchableOpacity>
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
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
  updateBtn: { backgroundColor: '#007BFF', padding: 8, borderRadius: 5 },
  updateText: { color: '#fff', fontWeight: 'bold' }
});
