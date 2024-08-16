// // src/lib/redux-toolkit/slices/cart.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = [];

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addBookToCart(state, action) {
//       state.push(action.payload);
//     },
//     removeBookFromCart(state, action) {
//       return state.filter((book) => book.id !== action.payload.id);
//     },
//   },
// });

// export const { addBookToCart, removeBookFromCart } = cartSlice.actions;
// export default cartSlice.reducer;
