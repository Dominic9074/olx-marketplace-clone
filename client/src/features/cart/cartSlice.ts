import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { cartState } from "./cartTypes";
import { getStoredCart, storeCart } from "./cartStorage";
import type Product from "../../types/productType";

const storedCart = getStoredCart();

const initialState: cartState = {
  items: storedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product._id === action.payload._id,
      );

      if (existingItem) {
        return;
      } else {
        state.items.push({
          product: action.payload,
        });
      }
      storeCart(state.items);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload,
      );

      storeCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      storeCart([]);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
