import React from "react";
import { IMAGE_CDN_URL } from "../utils/constants";
import { Link } from "react-router";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, cuisines, avgRating, sla, costForTwo, id } =
    resData?.info || {};

  return (
    <Link to={"/restaurant/" + id}>
      <div className="m-4 w-64 cursor-pointer rounded-xl border border-gray-200 bg-white p-3 shadow-md active:scale-95">
        <img
          src={IMAGE_CDN_URL + cloudinaryImageId}
          alt="Foods"
          className="h-40 w-full rounded-lg object-cover"
        />

        <div className="mt-3 px-1">
          <h3 className="truncate text-lg font-bold text-gray-900">{name}</h3>

          <h4 className="mt-1 w-full truncate text-sm text-gray-600">
            {cuisines?.join(", ")}
          </h4>

          <div className="mt-3 flex items-center text-sm font-semibold text-gray-700">
            <span className="rounded-md bg-green-600 px-1.5 py-1 text-white">
              ★ {avgRating}
            </span>

            <span className="px-2 text-xl">•</span>

            <span>{sla?.deliveryTime} mins</span>
          </div>

          <p className="mt-2 text-sm font-medium text-gray-600">{costForTwo}</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
