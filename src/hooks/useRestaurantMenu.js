import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/constants";

const useRestaurantMenu = (restaurantId) => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) {
      return;
    }

    fetchMenuData();
  }, [restaurantId]);

  async function fetchMenuData() {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${BACKEND_BASE_URL}/menus/restaurant/${restaurantId}`,
      );

      // console.log("Menu from backend:", response.data);

      const menuData = response.data || [];

      setMenuItems(menuData);
    } catch (error) {
      console.error(
        "Error fetching menu:",
        error.response?.data || error.message,
      );

      setMenuItems([]);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    menuItems,
    isLoading,
  };
};

export default useRestaurantMenu;
