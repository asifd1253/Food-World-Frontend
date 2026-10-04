import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
  },

  reducers: {
    // ADD ITEM / INCREASE QUANTITY
    addItem: (state, action) => {
      const newItem = action.payload;

      const isItemPresent = state.items.find((curItem) => {
        return curItem.menuId === newItem.menuId;
      });

      // Item is not in cart
      if (!isItemPresent) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }

      // Item already exists
      else {
        isItemPresent.quantity += 1;
      }
    },

    // REMOVE ITEM / DECREASE QUANTITY
    removeItem: (state, action) => {
      const menuId = action.payload;

      const isItemPresent = state.items.find((curItem) => {
        return curItem.menuId === menuId;
      });

      // Item doesn't exist
      if (!isItemPresent) {
        return;
      }

      // More than one item → decrease quantity
      if (isItemPresent.quantity > 1) {
        isItemPresent.quantity -= 1;
      }

      // Only one item → remove from cart
      else {
        state.items = state.items.filter((curItem) => {
          return curItem.menuId !== menuId;
        });
      }
    },

    // CLEAR CART
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
