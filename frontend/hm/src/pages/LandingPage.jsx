import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const categories = [
    {
      name: "WOMENS",
      path: "/home",
      img: "https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tZW5zJTIwY2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D", // updated womens image
    },
    {
      name: "MENS",
      path: "/home/mens",
      img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "KIDS",
      path: "/home/kids",
      img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleExplore = () => {
    if (user) navigate("/home");
    else navigate("/auth");
  };

  return (
    <div className="bg-white text-black">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative h-screen overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
          className="w-full h-full object-cover scale-100"
          alt="Hero"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3 }} // slower zoom
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <motion.h1
            className="text-6xl font-light tracking-[12px] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.8 }}
          >
            NEW SEASON
          </motion.h1>
          <motion.p
            className="text-lg tracking-widest mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            Discover the latest trends
          </motion.p>
          <motion.button
            onClick={handleExplore}
            className="px-10 py-3 bg-white text-black tracking-widest hover:bg-black hover:text-white transition transform hover:scale-105 shadow-lg"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, delay: 0.6 }}
          >
            SHOP NOW
          </motion.button>
        </div>
      </section>

      {/* ---------------- CATEGORY SECTION ---------------- */}
      <div className="bg-white text-black">
        {/* Your sections here */}
        {/* For example, CATEGORY SECTION */}
        <section className="max-w-7xl mx-auto px-8 py-20">
          <h2 className="text-3xl font-light tracking-[8px] text-center mb-16">
            SHOP BY CATEGORY
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                onClick={() => navigate(cat.path)}
                className="relative group cursor-pointer overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 1.5, delay: idx * 0.3 }}
              >
                <motion.img
                  src={cat.img}
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-1000"
                  whileHover={{ scale: 1.07 }}
                  alt={cat.name}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition flex items-center justify-center">
                  <h3 className="text-white text-2xl tracking-[6px]">{cat.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ---------------- EDITORIAL SECTION ---------------- */}
      <motion.section
        className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Image with zoom + slight parallax effect */}
        <motion.img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
          className="w-full h-[500px] object-cover rounded-md shadow-lg"
          initial={{ opacity: 0, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1.05 }} // subtle zoom
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 2 }}
          whileHover={{ scale: 1.08 }} // hover zoom
        />

        {/* Text with fade-in + slide-up */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 2, delay: 0.3 }}
        >
          <h2 className="text-3xl font-light tracking-[6px] mb-6">
            STYLE EDIT
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Discover curated fashion inspiration for the modern wardrobe. Timeless, elegant, and confident.
          </p>
          <motion.button
            className="px-8 py-3 bg-black text-white tracking-widest hover:bg-gray-900 transition shadow-lg"
            whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }} // noticeable hover
            whileTap={{ scale: 0.95 }}
          >
            EXPLORE NOW
          </motion.button>
        </motion.div>
      </motion.section>

      {/* ---------------- NEWSLETTER ---------------- */}
      <section className="bg-gray-100 py-20 text-center">
        <h2 className="text-2xl font-light tracking-[6px] mb-4">
          JOIN OUR NEWSLETTER
        </h2>
        <p className="text-gray-600 mb-8">
          Get updates on new arrivals and exclusive offers.
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <motion.input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-3 w-80 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            className="px-6 py-3 bg-black text-white tracking-widest hover:bg-gray-900 transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            SUBSCRIBE
          </motion.button>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-10 text-sm">
          {["SHOP", "COMPANY", "HELP", "FOLLOW"].map((heading, i) => (
            <div key={i}>
              <h4 className="mb-4 tracking-widest">{heading}</h4>
              <p className="hover:underline cursor-pointer">Link 1</p>
              <p className="hover:underline cursor-pointer">Link 2</p>
              <p className="hover:underline cursor-pointer">Link 3</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 text-xs text-gray-400">
          © 2026 H&M Inspired Fashion Platform
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;