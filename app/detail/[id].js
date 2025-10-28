import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useBookingStore } from '../../store/bookingStore';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const bookings = useBookingStore((s) => s.bookings);
  const updateBooking = useBookingStore((s) => s.updateBooking);
  const removeBooking = useBookingStore((s) => s.removeBooking);

  // Cari booking by id
  const item = bookings.find((b) => b.id === id);

  // State edit
  const [petType, setPetType] = useState('');
  const [petName, setPetName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (item) {
      setPetType(item.petType);
      setPetName(item.petName);
      setServiceType(item.serviceType);
      setDate(item.date);
    }
  }, [item]);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>Booking tidak ditemukan</Text>
      </View>
    );
  }

  const validate = () => {
    const errors = {};
    if (!petName.trim()) errors.petName = 'Nama hewan wajib diisi';
    if (!date.trim()) errors.date = 'Tanggal wajib diisi';
    if (!petType.trim()) errors.petType = 'Jenis hewan wajib diisi';
    if (!serviceType.trim()) errors.serviceType = 'Layanan wajib diisi';
    return errors;
  };

  const handleUpdate = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      Alert.alert('Gagal simpan!', Object.values(errors).join('\n'));
      return;
    }
    updateBooking(item.id, {
      petType, petName, serviceType, date,
      details: `${serviceType} untuk ${petType} pada ${date}`,
    });
    Alert.alert('Berhasil edit booking!');
    router.replace('/');
  };

  const handleDelete = () => {
    Alert.alert('Hapus Booking?', 'Yakin ingin menghapus?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => {
        removeBooking(item.id);
        router.replace('/');
      }},
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Edit Booking</Text>
      <Text style={styles.info}>Status: {item.status}</Text>
      <Text style={styles.info}>Detail: {item.details}</Text>

      <Text style={styles.inputLabel}>Jenis Hewan</Text>
      <Picker
        selectedValue={petType}
        style={styles.input}
        onValueChange={setPetType}
      >
        <Picker.Item label="Anjing" value="Anjing" />
        <Picker.Item label="Kucing" value="Kucing" />
      </Picker>

      <Text style={styles.inputLabel}>Nama Hewan</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Hewan"
        value={petName}
        onChangeText={setPetName}
      />

      <Text style={styles.inputLabel}>Layanan</Text>
      <Picker
        selectedValue={serviceType}
        style={styles.input}
        onValueChange={setServiceType}
      >
        <Picker.Item label="Grooming" value="Grooming" />
        <Picker.Item label="Penitipan" value="Penitipan" />
        <Picker.Item label="Check-up" value="Check-up" />
      </Picker>

      <Text style={styles.inputLabel}>Tanggal Booking</Text>
      <TextInput
        style={styles.input}
        placeholder="Tanggal Booking (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <Pressable style={styles.buttonUpdate} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </Pressable>
      <Pressable style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.buttonText}>Hapus Booking</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  label: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  info: { fontSize: 16, marginBottom: 6 },
  inputLabel: { marginTop: 12, marginBottom: 2, fontWeight: 'bold' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: Platform.OS === 'ios' ? 12 : 8, marginBottom: 8,
  },
  buttonUpdate: {
    backgroundColor: '#2196F3', borderRadius: 8, padding: 12, marginVertical: 8, alignItems: 'center'
  },
  buttonDelete: {
    backgroundColor: '#f44336', borderRadius: 8, padding: 12, marginVertical: 8, alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  errorMessage: { color: 'red', fontWeight: 'bold', padding: 20 },
});