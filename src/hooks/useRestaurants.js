import { useState, useEffect } from "react";
import { RESTAURANTS_API, SWIGGY_URL } from "../utils/constants";

const useRestaurants = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // const response = await fetch(CORS_PROXY_URL);
      //   const response = await fetch(SWIGGY_URL);
      const response = await fetch(RESTAURANTS_API);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      // console.log(json);

      const cards = json?.data?.cards || [];
      const restaurantCard = cards.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants,
      );
      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];
      // console.log("Restaurant Card:", restaurantCard);
      // console.log("Restaurants:", restaurants);
      // console.log(restaurants.map((restaurant) => restaurant.info.id));

      setRestaurantList(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return { restaurantList };
};

export default useRestaurants;
