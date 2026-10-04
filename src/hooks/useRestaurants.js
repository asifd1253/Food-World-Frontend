import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { BACKEND_BASE_URL } from "../utils/constants";
import { addRestaurants } from "../app/slices/restaurantSlice";

const useRestaurants = () => {
  const dispatch = useDispatch();

  const restaurantList = useSelector((store) => store.restaurant.restaurants);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  async function fetchRestaurants() {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/restaurants`);

      // console.log("Restaurants from backend:", response.data);

      const restaurants = response.data || [];

      dispatch(addRestaurants(restaurants));
    } catch (error) {
      console.error(
        "Error fetching restaurants:",
        error.response?.data || error.message,
      );
    }
  }

  return {
    restaurantList,
  };
};

export default useRestaurants;
