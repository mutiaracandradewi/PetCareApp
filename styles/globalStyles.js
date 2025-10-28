import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
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