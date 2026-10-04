import { useDispatch, useSelector } from "react-redux";
import MenuCategoryItems from "../../components/MenuCategoryItems";
import { clearCart } from "../../redux/slices/cartSlice";
import EmptyCart from "../../components/EmptyCart";
import CartBill from "../../components/CartBill";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const totalItems = cartItems.length;

  const dispatch = useDispatch();
  const handleClearCart = () => {
    return dispatch(clearCart());
  };

  if (totalItems === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
            Your order
          </p>

          <div className="mt-1 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-950">
                Your Cart
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            {/* Clear Cart */}
            <button
              type="button"
              onClick={handleClearCart}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <section className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Header */}
              <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                <h2 className="text-lg font-bold text-slate-900">Cart Items</h2>
              </div>

              {/* Items */}
              {/* Cart Items */}
              <div>
                {cartItems.map((item) => (
                  <MenuCategoryItems key={item.id} curItem={item} />
                ))}
              </div>
            </div>
          </section>
          {/* Cart Bill */}
          <section>
            <CartBill />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Cart;
