import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    house: "",
    street: "",
    area: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSignup(e) {
    e.preventDefault();

    setError("");

    // Check password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Check password length
    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }

    // Combine address into one value
    const address = [
      formData.house,
      formData.street,
      formData.area,
      formData.pincode,
    ]
      .filter((value) => value.trim() !== "")
      .join(", ");

    // console.log("Address:", address);

    try {
      const response = await fetch(
        "http://localhost:8080/FoodWorld-backend-tap/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },

          body: new URLSearchParams({
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
            address: address,
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {
        navigate("/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      {/* Signup Card */}
      <div className="w-full max-w-xl rounded-xl border border-slate-200 bg-white px-8 py-9 shadow-sm">
        {/* Top Icon */}
        <div className="flex justify-center">
          <div className="items-center justify-center">
            <img src="/logo.png" alt="logo" className="h-24" />
          </div>
        </div>

        {/* Heading */}
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Create Customer Account
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Sign up to discover great restaurants and fast doorstep delivery
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="mt-7">
          {/* Full Name + Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Full Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Phone Number <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  required
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Email Address <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                required
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* Password + Confirm Password */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                minLength={6}
                required
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="my-7 border-t border-slate-200"></div>

          {/* Address Heading */}
          <div className="mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-orange-500" />

            <h2 className="text-sm font-semibold text-slate-800">
              Delivery Address (Optional)
            </h2>
          </div>

          {/* House + Street */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="text"
              name="house"
              value={formData.house}
              onChange={handleChange}
              placeholder="Flat / House No. / Building"
              className="h-11 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street / Locality"
              className="h-11 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Area + Pincode */}
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-5">
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Area / Landmark"
              className="h-11 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 sm:col-span-3"
            />

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="560034"
              maxLength={6}
              className="h-11 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 sm:col-span-2"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="mt-4 text-center text-sm font-medium text-red-500">
              {error}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600 active:scale-[0.99]"
          >
            Register & Start Ordering
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
