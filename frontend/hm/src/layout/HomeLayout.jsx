import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Reusable Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="py-10 px-4 max-w-7xl mx-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default HomeLayout;