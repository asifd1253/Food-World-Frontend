import { useState, useEffect } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (restaurantId) => {
  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMenuData();
  }, [restaurantId]);

  async function fetchMenuData() {
    try {
      const response = await fetch(`${MENU_API}/${restaurantId}.json`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      // console.log(data);

      const cardsOfArray = json?.data?.cards || [];

      // finding the Restaurant card
      const restaurantCard = cardsOfArray.find((arrayIdx) => {
        return arrayIdx?.card?.card?.info;
      });
      // console.log(restaurantCard);

      const info = restaurantCard?.card?.card?.info;

      setRestaurantInfo(info || {});

      // finding the menu in the restaurant
      const menu = cardsOfArray.find((arrayIdx) => {
        return arrayIdx?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      });

      const menuItems = menu?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

      const extractedMenuItems = menuItems.flatMap((menuArrayIdx) => {
        const menuData = menuArrayIdx?.card?.card;

        // Normal category
        if (
          menuData?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) {
          return (
            menuData.itemCards?.map((item) => ({
              category: menuData.title,
              ...item.card.info,
            })) || []
          );
        }

        // Nested category
        if (
          menuData?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
        ) {
          return (
            menuData.categories?.flatMap(
              (category) =>
                category.itemCards?.map((item) => ({
                  category: `${menuData.title} / ${category.title}`,
                  ...item.card.info,
                })) || [],
            ) || []
          );
        }
        return [];
      });

      // console.log(extractedMenuItems);
      setMenuItems(extractedMenuItems);
    } catch (error) {
      console.log("Error fetching Menu: ", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // console.log(restaurantInfo);
  // console.log(menuItems);
  // console.log(isLoading);

  return { restaurantInfo, menuItems, isLoading };
};

export default useRestaurantMenu;
