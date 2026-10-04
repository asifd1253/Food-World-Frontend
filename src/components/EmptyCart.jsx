import React from "react";
import { Link } from "react-router";

const EmptyCart = () => {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10">
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
          🛒
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900">
          Your cart is empty
        </h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          Add some delicious food from your favourite restaurants and come back
          here to place your order.
        </p>

        <Link
          to="/restaurant"
          className="mt-7 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 active:scale-95"
        >
          Browse Restaurants
        </Link>
      </div>
    </main>
  );
};

export default EmptyCart;
