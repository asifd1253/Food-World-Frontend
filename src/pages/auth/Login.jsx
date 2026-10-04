import React, { useState } from "react";

import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/FoodWorld-backend-tap/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },

          body: new URLSearchParams({
            email: email,
            password: password,
          }),
        },
      );

      const data = await response.json();
      console.log(data);

      if (data.success) {
        navigate("/restaurant");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-6">
      {/* Main Card */}
      <div className="w-full max-w-[442px] rounded-xl border border-slate-200 bg-white px-7 py-7 shadow-[0_2px_8px_rgba(15,23,42,0.08)]">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="FoodWorld Logo" />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-[24px] leading-8 font-extrabold text-[#071b3a]">
            Welcome Back!
          </h1>

          <p className="mt-1 text-[14px] text-slate-500">
            Order delicious food or manage your restaurant portal
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-8">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-[14px] font-medium text-[#172b4d] mb-2"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-[14px] text-slate-700 outline-none placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="text-[14px] font-medium text-[#172b4d]"
              >
                Password
              </label>

              <button
                type="button"
                className="text-[12px] font-medium text-orange-500 hover:text-orange-600"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-10 rounded-lg border border-slate-300 bg-white pl-11 pr-11 text-[14px] text-slate-700 outline-none placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

              {/* Password Visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Sign In Button */}
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[15px] font-bold shadow-[0_7px_15px_rgba(255,107,0,0.22)] transition-all hover:from-orange-600 hover:to-orange-700 active:scale-[0.99]"
          >
            <span className="flex items-center justify-center gap-2">
              Sign In
              <ArrowRight size={18} />
            </span>
          </button>
        </form>

        {/* Signup */}
        <div className="text-center mt-6 text-[13px] text-slate-500">
          Don't have an account?
          <button
            type="button"
            className="ml-1 font-semibold text-orange-500 hover:text-orange-600"
          >
            <Link to="/signup">Create Customer Account</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
