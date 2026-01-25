import React from "react";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const activeClass =
    "text-blue-600 border-b-2 border-blue-600";
  const normalClass =
    "text-gray-700 hover:text-blue-500";

  return (
    <div className="px-6 py-4 flex gap-10 items-center justify-between bg-white shadow-md">
      {/* Logo */}
      <img
        width={50}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgWS-RsyrkfIVwCyRB7L8SECa40zRl0VkJMQ&s"
        alt="Logo"
      />

      {/* Navigation Links */}
      <nav className="flex gap-8 text-lg font-semibold">
        <NavLink
          to="/home"
          end
          className={({ isActive }) =>
            isActive ? activeClass : normalClass
          }
        >
          Women
        </NavLink>
        <NavLink
          to="/home/mens"
          className={({ isActive }) =>
            isActive ? activeClass : normalClass
          }
        >
          Men
        </NavLink>
        <NavLink
          to="/home/kids"
          className={({ isActive }) =>
            isActive ? activeClass : normalClass
          }
        >
          Kids
        </NavLink>
      </nav>

      {/* Create Product Button */}
      <div>
        <button
          onClick={() => navigate("/home/create-product")}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Navbar;
