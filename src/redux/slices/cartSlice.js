import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;

      const isItemPresent = state.items.find((curItem) => {
        return newItem.id === curItem.id;
      });

      if (!isItemPresent) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      } else {
        isItemPresent.quantity += 1;
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;

      const isItemPresent = state.items.find((curItem) => {
        return curItem.id === itemId;
      });

      if (!isItemPresent) {
        return;
      }

      if (isItemPresent.quantity > 1) {
        isItemPresent.quantity -= 1;
      } else {
        state.items = state.items.filter((curItem) => {
          return curItem.id !== itemId;
        });
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
