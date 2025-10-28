import { create } from 'zustand';

export const useBookingStore = create((set) => ({
  bookings: [],
  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, { ...booking, purchased: false }],
    })),
  removeBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((item) => item.id !== id),
    })),
  togglePurchased: (id) =>
    set((state) => ({
      bookings: state.bookings.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      ),
    })),
  updateBooking: (id, updatedData) =>
    set((state) => ({
      bookings: state.bookings.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      ),
    })),
}));