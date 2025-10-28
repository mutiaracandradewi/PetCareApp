import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useBookingStore } from '../store/bookingStore';

export default function AddScreen() {
  const router = useRouter();
  const addBooking = useBookingStore((state) => state.addBooking);

  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Anjing');
  const [serviceType, setServiceType] = useState('Grooming');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!petName.trim()) newErrors.petName = 'Pet name is required';
    if (!date.trim()) newErrors.date = 'Date is required';
    if (!petType.trim()) newErrors.petType = 'Pet type is required';
    if (!serviceType.trim()) newErrors.serviceType = 'Service type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addBooking({
      id: Date.now().toString(),
      petType,
      petName,
      serviceType,
      date,
      status: 'pending',
      details: `${serviceType} for ${petType} on ${date}`,
    });
    if (Platform.OS === 'web') {
      alert('Booking added successfully!');
      router.back();
    } else {
      const Alert = require('react-native').Alert;
      Alert.alert('Success', 'Booking added successfully!', [{ onPress: () => router.back() }]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Booking</Text>
      <Text style={styles.label}>Pet Type</Text>
      <Picker
        selectedValue={petType}
        style={styles.input}
        onValueChange={setPetType}
      >
        <Picker.Item label="Anjing" value="Anjing" />
        <Picker.Item label="Kucing" value="Kucing" />
      </Picker>
      {errors.petType && <Text style={styles.error}>{errors.petType}</Text>}

      <Text style={styles.label}>Pet Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pet name"
        value={petName}
        onChangeText={setPetName}
      />
      {errors.petName && <Text style={styles.error}>{errors.petName}</Text>}

      <Text style={styles.label}>Service Type</Text>
      <Picker
        selectedValue={serviceType}
        style={styles.input}
        onValueChange={setServiceType}
      >
        <Picker.Item label="Grooming" value="Grooming" />
        <Picker.Item label="Penitipan" value="Penitipan" />
        <Picker.Item label="Check-up" value="Check-up" />
      </Picker>
      {errors.serviceType && <Text style={styles.error}>{errors.serviceType}</Text>}

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={setDate}
      />
      {errors.date && <Text style={styles.error}>{errors.date}</Text>}

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Booking</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: Platform.OS === 'ios' ? 12 : 8, marginBottom: 8,
  },
  button: {
    backgroundColor: '#2196F3', borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 16
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', marginBottom: 8, marginTop: -4 },
});