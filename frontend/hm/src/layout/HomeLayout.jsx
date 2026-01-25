import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const HomeLayout = () => {
  const activeClass =
    "text-blue-600 border-b-2 border-blue-600 font-semibold";
  const normalClass =
    "text-gray-600 hover:text-blue-600 border-b-2 border-transparent";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex space-x-8">
              <NavLink
                to="/home"
                end
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Womens
              </NavLink>
              <NavLink
                to="/home/mens"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Mens
              </NavLink>
              <NavLink
                to="/home/kids"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Kids
              </NavLink>
              <NavLink
                to="/home/create-product"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Create Product
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="py-10 px-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
