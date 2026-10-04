import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const CartBill = () => {
  const cartItems = useSelector((store) => {
    return store.cart.items;
  });

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, curItem) => {
    const price = curItem.price || curItem.defaultPrice || 0;
    if (curItem.quantity > 1) {
      return total + curItem.quantity * price;
    }
    return total + price;
  }, 0);

  // Delivery fee
  const deliveryFee = subtotal > 0 ? 40 : 0;

  // Platform fee
  const platformFee = subtotal > 0 ? 5 : 0;

  // Total
  const totalAmount = subtotal + deliveryFee + platformFee;

  // Convert paise to rupees
  const formatPrice = (price) => {
    return `₹${(price / 100).toFixed(0)}`;
  };
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold text-slate-900">Bill Details</h2>

        <div className="mt-5 space-y-4">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Item Total</span>

            <span className="font-semibold text-slate-800">
              {formatPrice(subtotal)}
            </span>
          </div>

          {/* Delivery */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Delivery Fee</span>

            <span className="font-semibold text-slate-800">₹{deliveryFee}</span>
          </div>

          {/* Platform */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Platform Fee</span>

            <span className="font-semibold text-slate-800">₹{platformFee}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-dashed border-slate-200" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-slate-900">To Pay</span>

          <span className="text-xl font-extrabold text-slate-950">
            {formatPrice(totalAmount + (deliveryFee + platformFee) * 100)}
          </span>
        </div>

        {/* Checkout */}
        <Link
          to="/payments"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-orange-500 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.98]"
        >
          Proceed to Checkout
        </Link>

        {/* Continue Shopping */}
        <Link
          to="/restaurant"
          className="mt-3 flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Add More Items
        </Link>
      </div>
    </aside>
  );
};

export default CartBill;
