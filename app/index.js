import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { initialServices } from '../data/services';
import { useBookingStore } from '../store/bookingStore';

export default function HomeScreen() {
  const router = useRouter();
  const { bookings, removeBooking } = useBookingStore();

  // 🗑️ Hapus Booking
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

  // 🔹 Item Service
  const renderService = ({ item }) => (
    <Pressable
      style={styles.serviceContainer}
      onPress={() => router.push(`/detail/${item.id}`)}
    >
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>Rp{item.price.toLocaleString()}</Text>
    </Pressable>
  );

  // 🔹 Item Booking
  const renderBooking = ({ item }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => router.push(`/detail/${item.id}`)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.petName} ({item.petType})</Text>
        <Text style={styles.itemDetails}>
          {item.serviceType} - {item.date}
        </Text>
        <Text style={styles.customer}>Pemesan: {item.customerName}</Text>
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
      <ScrollView>
        {/* ===== SERVICE LIST (ATAS) ===== */}
        <Text style={styles.header}>Available Services</Text>
        <FlatList
          data={initialServices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderService}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 40 }}>No services available</Text>
          }
        />

        {/* ===== BOOKING LIST (BAWAH) ===== */}
        <Text style={[styles.header, { marginTop: 24 }]}>My Bookings</Text>
        {bookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bookings yet</Text>
            <Text style={styles.emptyTextSmall}>Tap the + button to add bookings</Text>
          </View>
        ) : (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id}
            renderItem={renderBooking}
            scrollEnabled={false}
          />
        )}
      </ScrollView>

      {/* ===== FAB ADD BUTTON ===== */}
      <Pressable style={styles.fab} onPress={() => router.push('/add')}>
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  emptyContainer: { alignItems: 'center', marginVertical: 20 },
  emptyText: { fontSize: 16, color: '#888' },
  emptyTextSmall: { fontSize: 13, color: '#aaa', marginTop: 4 },
  customer: { fontSize: 13, color: '#555', marginTop: 2 },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemContent: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemDetails: { fontSize: 14, color: '#666', marginTop: 2 },
  deleteButton: {
    backgroundColor: '#f44336',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#2196F3',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  fabIcon: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
  },
  serviceName: { fontSize: 16, fontWeight: 'bold' },
  servicePrice: { fontSize: 16, color: '#007bff', fontWeight: 'bold' },
});
