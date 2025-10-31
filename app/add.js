import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useBookingStore } from '../store/bookingStore';

export default function AddBookingScreen() {
  const router = useRouter();
  const addBooking = useBookingStore((state) => state.addBooking);

  const [form, setForm] = useState({
    customerName: '',
    petName: '',
    petType: '',
    serviceType: '',
    date: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    if (!form.customerName || !form.petName || !form.petType || !form.serviceType || !form.date) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    addBooking(form);
    Alert.alert('Success', 'Booking added successfully!');
    router.back(); // kembali ke Home
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Booking</Text>

      {/* Customer Name */}
      <Text style={styles.label}>Customer Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={form.customerName}
        onChangeText={(text) => handleChange('customerName', text)}
      />

      {/* Pet Name */}
      <Text style={styles.label}>Pet Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pet name"
        value={form.petName}
        onChangeText={(text) => handleChange('petName', text)}
      />

      {/* Pet Type Picker */}
      <Text style={styles.label}>Pet Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.petType}
          onValueChange={(value) => handleChange('petType', value)}
        >
          <Picker.Item label="Select Pet Type" value="" />
          <Picker.Item label="Dog" value="Dog" />
          <Picker.Item label="Cat" value="Cat" />
          <Picker.Item label="Rabbit" value="Rabbit" />
          <Picker.Item label="Bird" value="Bird" />
        </Picker>
      </View>

      {/* Service Type Picker */}
      <Text style={styles.label}>Service Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.serviceType}
          onValueChange={(value) => handleChange('serviceType', value)}
        >
          <Picker.Item label="Select Service Type" value="" />
          <Picker.Item label="Grooming" value="Grooming" />
          <Picker.Item label="Health Check" value="Health Check" />
          <Picker.Item label="Vaccination" value="Vaccination" />
          <Picker.Item label="Pet Sitting" value="Pet Sitting" />
        </Picker>
      </View>

      {/* Date */}
      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={form.date}
        onChangeText={(text) => handleChange('date', text)}
      />

      {/* Submit Button */}
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Booking</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
