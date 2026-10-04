import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState("Login");

  function handleLoginBtn() {
    if (isLoggedin === "Login") {
      setIsLoggedin("Signout");
      navigate("/login");
    } else {
      setIsLoggedin("Login");
    }
  }

  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  const totalItems = cartItems.reduce((acc, curItem) => {
    return acc + curItem.quantity;
  }, 0);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-gray-100 px-8 py-4 shadow-md">
      <div className="w-28">
        <Link to="/">
          <img
            src="/logo.png"
            alt="logo"
            className="h-auto w-full cursor-pointer object-contain active:scale-95"
          />
        </Link>
      </div>
      <nav>
        <ul className="flex items-center gap-8">
          <li className="cursor-pointer font-medium active:scale-95">
            <Link to="/">Home</Link>
          </li>

          <li className="cursor-pointer font-medium active:scale-95">
            <Link to="/about">About</Link>
          </li>

          <li className="cursor-pointer font-medium active:scale-95">
            <Link to="/">Orders</Link>
          </li>

          <li className="cursor-pointer font-medium active:scale-95">
            <Link
              to="/cart"
              className="flex items-center gap-2 transition-colors hover:text-blue-600"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>

              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                {totalItems}
              </span>
            </Link>
          </li>

          <li className="cursor-pointer font-medium active:scale-95">
            <Link to="/profile">Profile</Link>
          </li>

          <li>
            <button
              onClick={handleLoginBtn}
              className="text-white-700 hover:text-white-500 cursor-pointer rounded-lg border-2 border-gray-300 bg-white px-3 py-1 font-semibold transition-all duration-300 hover:border-blue-500 hover:bg-blue-100 active:scale-95"
            >
              {isLoggedin}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
