// src/lib/zustand.js
import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (book) =>
    set((state) => ({
      cart: [...state.cart, { ...book, quantity: 1 }],
    })),
  removeFromCart: (bookId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== bookId),
    })),
  updateQuantity: (bookId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === bookId ? { ...item, quantity } : item
      ),
    })),
}));
