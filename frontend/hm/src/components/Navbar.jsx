import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../features/AuthSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.auth.token);

  // Cart pulse effect state
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(timer);
  }, [cartItems]);

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-widest cursor-pointer hover:text-red-600 transition"
        >
          H&M
        </h1>

        {/* Links */}
        <nav className="hidden md:flex gap-10 text-sm font-medium tracking-wide">
          <NavLink
            to="/home"
            end  // important: prevents partial matching
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-semibold"
                : "text-black hover:text-red-600 transition"
            }
          >
            WOMEN
          </NavLink>

          <NavLink
            to="/home/mens"
            end
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-semibold"
                : "text-black hover:text-red-600 transition"
            }
          >
            MEN
          </NavLink>

          <NavLink
            to="/home/kids"
            end
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-semibold"
                : "text-black hover:text-red-600 transition"
            }
          >
            KIDS
          </NavLink>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* Cart */}
          <div
            onClick={() => navigate("/home/cart")}
            className={`relative cursor-pointer text-gray-700 hover:text-red-600 transition font-semibold ${
              bump ? "animate-bounce" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.2a1 1 0 001 1.2h12a1 1 0 001-1.2L17 13M7 13H5.4" />
            </svg>
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* Create Product */}
          <button
            onClick={() => navigate("/home/create-product")}
            className="border px-4 py-2 text-sm rounded hover:bg-black hover:text-white transition"
          >
            CREATE
          </button>

          {/* Auth Button */}
          {token ? (
            <button
              onClick={handleLogout}
              className="border px-4 py-2 text-sm rounded hover:bg-red-600 hover:text-white transition"
            >
              LOGOUT
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="border px-4 py-2 text-sm rounded hover:bg-black hover:text-white transition"
            >
              LOGIN
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;