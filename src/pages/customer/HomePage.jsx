import RestaurantCard from "../../components/RestaurantCard";
import { useState, useEffect } from "react";
import useRestaurants from "../../hooks/useRestaurants";
import HomeShimmer from "../../components/HomeShimmer";

const HomePage = () => {
  const { restaurantList } = useRestaurants();

  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const searchTextLower = searchText.toLowerCase();

    const filteredList = restaurantList.filter((restaurant) => {
      const restaurantName = restaurant.restaurantName?.toLowerCase() || "";

      const cuisineType = restaurant.cuisineType?.toLowerCase() || "";

      return (
        restaurantName.includes(searchTextLower) ||
        cuisineType.includes(searchTextLower)
      );
    });

    setFilteredRestaurantList(filteredList);
  }, [searchText, restaurantList]);

  return restaurantList.length === 0 ? (
    <div className="flex flex-wrap justify-center">
      {Array.from({ length: 12 }, (_, index) => (
        <HomeShimmer key={index} />
      ))}
    </div>
  ) : (
    <div>
      {/* Search */}
      <div className="m-6 flex items-center justify-center gap-3">
        <input
          type="text"
          className="h-10 w-full max-w-2xl rounded-lg border border-gray-300 px-3 text-base font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 active:scale-95"
          placeholder="Search for restaurants or cuisines..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </div>

      {/* Restaurants */}
      <div className="flex flex-wrap justify-center">
        {filteredRestaurantList.map((restaurant) => (
          <RestaurantCard key={restaurant.restaurantId} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
