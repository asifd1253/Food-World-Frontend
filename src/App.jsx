import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import appStore from "./app/appStore";

import Layout from "./Layout";

import Login from "./pages/auth/Login";
import Signup from "./pages/customer/Signup";

import HomePage from "./pages/customer/HomePage";
import RestaurantMenu from "./pages/customer/RestaurantMenu";
import About from "./pages/customer/About";
import Cart from "./pages/customer/Cart";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {/* Authentication pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Pages having common Layout/Header/Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />

            <Route
              path="/restaurant/:restaurantId"
              element={<RestaurantMenu />}
            />

            <Route path="/restaurant" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
