import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../app/slices/cartSlice";

const MenuCategoryItems = ({ curItem }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);

  // Find this particular item in the cart
  const cartItem = cartItems.find((item) => item.menuId === curItem.menuId);

  const quantity = cartItem ? cartItem.quantity : 0;

  // Backend price is already in rupees
  const price = curItem?.price;

  // Add item to cart
  const handleAddToCart = () => {
    dispatch(addItem(curItem));
  };

  // Remove item from cart
  const handleRemoveFromCart = () => {
    dispatch(removeItem(curItem.menuId));
  };

  // Check whether item is vegetarian
  const isVeg = curItem?.foodType?.toLowerCase() === "veg";

  return (
    <div className="flex flex-col gap-5 px-5 py-6 hover:bg-slate-50/80 sm:flex-row sm:justify-between sm:px-6">
      {/* ================= LEFT PART ================= */}
      <div className="min-w-0 flex-1">
        {/* Veg / Non-Veg */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-sm border ${
              isVeg ? "border-emerald-600" : "border-rose-600"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isVeg ? "bg-emerald-600" : "bg-rose-600"
              }`}
            />
          </span>

          <span
            className={`text-xs font-bold uppercase tracking-wide ${
              isVeg ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isVeg ? "Veg" : "Non-veg"}
          </span>
        </div>

        {/* Item Name */}
        <div className="text-lg font-bold leading-snug text-slate-950">
          {curItem?.itemName || "Menu Item"}
        </div>

        {/* Price */}
        {price !== null && price !== undefined && (
          <p className="mt-2 text-base font-bold text-slate-800">
            ₹{Number(price).toFixed(0)}
          </p>
        )}

        {/* Rating */}
        {curItem?.rating !== null &&
          curItem?.rating !== undefined &&
          curItem.rating > 0 && (
            <div className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
              <p>★ {curItem.rating}</p>
            </div>
          )}

        {/* Description */}
        {curItem?.description && (
          <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-6 text-slate-500">
            {curItem.description}
          </p>
        )}
      </div>

      {/* ================= RIGHT PART ================= */}
      <div className="relative h-36 w-full shrink-0 sm:w-40">
        {/* Image */}
        <div className="h-full w-full">
          {curItem?.itemImageUrl ? (
            <img
              src={curItem.itemImageUrl}
              alt={curItem?.itemName || "Menu Item"}
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
            disabled={curItem?.isAvailable === false}
            className={`absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-xl border px-6 py-2 text-sm font-extrabold shadow-lg transition active:scale-95 ${
              curItem?.isAvailable === false
                ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                : "cursor-pointer border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            {curItem?.isAvailable === false ? "UNAVAILABLE" : "ADD"}
          </button>
        ) : (
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
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
              disabled={curItem?.isAvailable === false}
              className="cursor-pointer px-2 py-1 text-xl font-semibold text-emerald-600 transition hover:bg-emerald-50 active:scale-75 disabled:cursor-not-allowed disabled:text-slate-300"
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
