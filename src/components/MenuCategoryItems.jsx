import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_CDN_URL } from "../utils/constants";
import { addItem, removeItem } from "../redux/slices/cartSlice";


const MenuCategoryItems = ({ curItem }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);

  // Find this particular item in the cart
  const cartItem = cartItems.find((item) => item.id === curItem.id);

  const quantity = cartItem ? cartItem.quantity : 0;
//   console.log(quantity);

  const price = curItem.price || curItem.defaultPrice;

  const handleAddToCart = () => {
    dispatch(addItem(curItem));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItem(curItem.id));
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-6 hover:bg-slate-50/80 sm:flex-row sm:justify-between sm:px-6">
      {/* ================= LEFT PART ================= */}
      <div className="min-w-0 flex-1">
        {/* Veg / Non-Veg */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-sm border ${
              curItem.isVeg ? "border-emerald-600" : "border-rose-600"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                curItem.isVeg ? "bg-emerald-600" : "bg-rose-600"
              }`}
            />
          </span>

          <span
            className={`text-xs font-bold uppercase tracking-wide ${
              curItem.isVeg ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {curItem.isVeg ? "Veg" : "Non-veg"}
          </span>
        </div>

        {/* Item Name */}
        <div className="text-lg font-bold leading-snug text-slate-950">
          {curItem.name}
        </div>

        {/* Price */}
        <div>
          {price && (
            <p className="mt-2 text-base font-bold text-slate-800">
              ₹{(price / 100).toFixed(0)}
            </p>
          )}
        </div>

        {/* Rating */}
        {curItem.ratings?.aggregatedRating?.rating && (
          <div className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
            <p>★ {curItem.ratings.aggregatedRating.rating}</p>
          </div>
        )}

        {/* Description */}
        {curItem.description && (
          <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-6 text-slate-500">
            {curItem.description}
          </p>
        )}
      </div>

      {/* ================= RIGHT PART ================= */}
      <div className="relative h-36 w-full shrink-0 sm:w-40">
        {/* Image */}
        <div className="h-full w-full">
          {curItem.imageId ? (
            <img
              src={IMAGE_CDN_URL + curItem.imageId}
              alt={curItem.name}
              className="h-full w-full rounded-xl object-cover shadow-sm ring-1"
            />
          ) : (
            <p className="flex h-full w-full items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-400 ring-1">
              No Image
            </p>
          )}
        </div>

        {/* ADD / QUANTITY BUTTON */}
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 cursor-pointer rounded-xl border border-emerald-200 bg-white px-6 py-2 text-sm font-extrabold text-emerald-700 shadow-lg transition hover:bg-emerald-50 active:scale-95"
          >
            ADD
          </button>
        ) : (
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg ">
            {/* Minus */}
            <button
              onClick={handleRemoveFromCart}
              className="cursor-pointer px-2 py-1 text-xl font-semibold text-emerald-600 transition hover:bg-emerald-50 active:scale-75"
            >
              −
            </button>

            {/* Quantity */}
            <span className="min-w-10 text-center text-sm font-bold text-emerald-700">
              {quantity}
            </span>

            {/* Plus */}
            <button
              onClick={handleAddToCart}
              className="cursor-pointer px-2 py-1 text-xl font-semibold text-emerald-600 transition hover:bg-emerald-50 active:scale-75"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCategoryItems;
