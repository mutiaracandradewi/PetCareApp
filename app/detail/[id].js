// app/detail/[id].js
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useBookingStore } from '../../store/bookingStore';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const bookings = useBookingStore((s) => s.bookings);
  const updateBooking = useBookingStore((s) => s.updateBooking);
  const removeBooking = useBookingStore((s) => s.removeBooking);

  // Pastikan id string
  const item = bookings.find((b) => String(b.id) === id);

  const [form, setForm] = useState({
    customerName: '',
    petName: '',
    petType: '',
    serviceType: '',
    date: '',
  });

  useEffect(() => {
    if (item) {
      setForm({
        customerName: item.customerName || '',
        petName: item.petName || '',
        petType: item.petType || '',
        serviceType: item.serviceType || '',
        date: item.date || '',
      });
    }
  }, [item]);

  if (!item) return <Text style={{ textAlign: 'center', marginTop: 20 }}>Booking not found!</Text>;

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleUpdate = () => {
    if (!form.customerName || !form.petName || !form.petType || !form.serviceType || !form.date) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }
    updateBooking(item.id, { ...form, details: `${form.serviceType} untuk ${form.petType} pada ${form.date}` });
    Alert.alert('Success', 'Booking updated successfully!');
    router.replace('/'); // kembali ke Home
  };

  const handleDelete = () => {
    Alert.alert('Hapus Booking?', 'Yakin ingin menghapus?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => { removeBooking(item.id); router.replace('/'); } },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Booking</Text>

      <Text style={styles.label}>Customer Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={form.customerName}
        onChangeText={(t) => handleChange('customerName', t)}
      />

      <Text style={styles.label}>Pet Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pet name"
        value={form.petName}
        onChangeText={(t) => handleChange('petName', t)}
      />

      <Text style={styles.label}>Pet Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.petType}
          onValueChange={(v) => handleChange('petType', v)}
        >
          <Picker.Item label="Select Pet Type" value="" />
          <Picker.Item label="Dog" value="Dog" />
          <Picker.Item label="Cat" value="Cat" />
          <Picker.Item label="Rabbit" value="Rabbit" />
          <Picker.Item label="Bird" value="Bird" />
        </Picker>
      </View>

      <Text style={styles.label}>Service Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.serviceType}
          onValueChange={(v) => handleChange('serviceType', v)}
        >
          <Picker.Item label="Select Service Type" value="" />
          <Picker.Item label="Grooming" value="Grooming" />
          <Picker.Item label="Health Check" value="Health Check" />
          <Picker.Item label="Vaccination" value="Vaccination" />
          <Picker.Item label="Pet Sitting" value="Pet Sitting" />
        </Picker>
      </View>

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={form.date}
        onChangeText={(t) => handleChange('date', t)}
      />

      <Pressable style={styles.buttonUpdate} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Booking</Text>
      </Pressable>

      <Pressable style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Booking</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 15 },
  buttonUpdate: { backgroundColor: '#007bff', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonDelete: { backgroundColor: '#f44336', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
