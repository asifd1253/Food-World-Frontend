import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
  name: "restaurant",

  initialState: {
    restaurants: [],
    selectedRestaurant: null,
  },

  reducers: {
    // Store all restaurants
    addRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },

    // Store the selected restaurant
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },

    // Clear selected restaurant
    clearSelectedRestaurant: (state) => {
      state.selectedRestaurant = null;
    },

    // Clear all restaurant data
    clearRestaurants: (state) => {
      state.restaurants = [];
      state.selectedRestaurant = null;
    },
  },
});

export const {
  addRestaurants,
  setSelectedRestaurant,
  clearSelectedRestaurant,
  clearRestaurants,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
