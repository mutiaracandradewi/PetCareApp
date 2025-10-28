import { View, Text, FlatList, StyleSheet } from 'react-native';
import { initialServices } from '../data/services';

export default function ServicesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Service List</Text>
      <FlatList
        data={initialServices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Rp{item.price.toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>No services available</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  itemContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, backgroundColor: '#f6f6f6', borderRadius: 8, marginBottom: 10,
  },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemPrice: { fontSize: 16, color: '#007bff', fontWeight: 'bold' },
});