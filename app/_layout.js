import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007bff',
        tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add Booking',
          tabBarIcon: ({ color, size }) => <FontAwesome name="plus-square" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mybookings"
        options={{
          title: 'My Bookings',
          tabBarIcon: ({ color, size }) => <FontAwesome name="calendar-check-o" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
