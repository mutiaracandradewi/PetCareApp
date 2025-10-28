import { View, Text, FlatList, StyleSheet, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useBookingStore } from '../store/bookingStore';

export default function HomeScreen() {
  const router = useRouter();
  const { bookings, removeBooking } = useBookingStore();

  const handleDelete = (id, petName) => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Are you sure you want to delete "${petName}"?`)) {
        removeBooking(id);
      }
    } else {
      const Alert = require('react-native').Alert;
      Alert.alert(
        'Delete Booking',
        `Are you sure you want to delete "${petName}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => removeBooking(id) },
        ]
      );
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => router.push(`/detail/${item.id}`)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.petName}</Text>
        <Text style={styles.itemDetails}>
          {item.petType} | {item.serviceType} | {item.date}
        </Text>
      </View>
      <Pressable
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id, item.petName)}
      >
        <Text style={{ color: "#fff" }}>Delete</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking List</Text>
      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookings yet</Text>
          <Text style={styles.emptyTextSmall}>Tap the + button to add bookings</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
      <Pressable
        style={styles.fab}
        onPress={() => router.push('/add')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 48 },
  emptyText: { fontSize: 18, color: '#888' },
  emptyTextSmall: { fontSize: 14, color: '#aaa', marginTop: 8 },
  itemContainer: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    backgroundColor: '#f6f6f6', borderRadius: 8, marginBottom: 10,
  },
  itemContent: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemDetails: { fontSize: 14, color: '#666', marginTop: 2 },
  deleteButton: {
    backgroundColor: '#f44336', borderRadius: 6, paddingVertical: 6, paddingHorizontal: 12, marginLeft: 10,
  },
  fab: {
    position: 'absolute', right: 20, bottom: 30, backgroundColor: '#2196F3',
    width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', elevation: 3,
  },
  fabIcon: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
});