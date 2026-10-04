import React from "react";
import { Link } from "react-router";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    restaurantId,
    restaurantName,
    cuisineType,
    rating,
    deliveryTime,
    costForTwo,
    restaurantImageUrl,
  } = resData || {};

  return (
    <Link to={"/restaurant/" + restaurantId}>
      <div className="m-4 w-64 cursor-pointer rounded-xl border border-gray-200 bg-white p-3 shadow-md active:scale-95">
        {/* Restaurant Image */}
        <img
          src={restaurantImageUrl}
          alt={restaurantName}
          className="h-40 w-full rounded-lg object-cover"
        />

        <div className="mt-3 px-1">
          {/* Restaurant Name */}
          <h3 className="truncate text-lg font-bold text-gray-900">
            {restaurantName}
          </h3>

          {/* Cuisine */}
          <h4 className="mt-1 w-full truncate text-sm text-gray-600">
            {cuisineType}
          </h4>

          {/* Rating + Delivery Time */}
          <div className="mt-3 flex items-center text-sm font-semibold text-gray-700">
            <span className="rounded-md bg-green-600 px-1.5 py-1 text-white">
              ★ {rating}
            </span>

            <span className="px-2 text-xl">•</span>

            <span>{deliveryTime} mins</span>
          </div>

          {/* Cost For Two */}
          <p className="mt-2 text-sm font-medium text-gray-600">
            ₹{costForTwo} for two
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
