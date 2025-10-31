import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useBookingStore } from '../store/bookingStore';

export default function MyBookingsScreen() {
  const router = useRouter();
  const { bookings, removeBooking } = useBookingStore();

  const renderItem = ({ item }) => (
    <Pressable style={styles.item} onPress={() => router.push(`/detail/${item.id}`)}>
      <View>
        <Text style={styles.name}>{item.petName}</Text>
        <Text>{item.petType} | {item.serviceType} | {item.date}</Text>
      </View>
      <Pressable style={styles.delete} onPress={() => removeBooking(item.id)}>
        <Text style={{ color: '#fff' }}>Delete</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {bookings.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No bookings yet</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  delete: { backgroundColor: 'red', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
});
