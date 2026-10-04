import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice.js";
import restaurantReducer from "./slices/restaurantSlice";

const appStore = configureStore({
  reducer: {
    cart: cartSlice,
    restaurant: restaurantReducer,
  },
});

export default appStore;
