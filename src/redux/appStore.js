import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice.js";

const appStore = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default appStore;
