import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import ProductCard from "../components/ProductCard";
import CategoryTabs from "../components/CategoryTabs";
import { motion } from "framer-motion";

const HomePage = () => {
  const categories = ["WOMENS", "MENS", "KIDS"];
  const [activeCategory, setActiveCategory] = useState("WOMENS");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async (category) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/product?category=${category}`);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts(activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative mb-12">
        <img
          src="https://images.unsplash.com/photo-1586443320420-2179d8f26d17?auto=format&fit=crop&w=1600&q=80"
          alt="Hero Banner"
          className="w-full h-[400px] md:h-[500px] object-cover rounded-xl shadow-lg"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
            H&M Collections
          </h1>
          <p className="text-lg md:text-xl text-center tracking-wide">
            Discover the latest fashion trends for every style.
          </p>
        </div>
      </section>

      {/* ---------------- CATEGORY TABS ---------------- */}
      <CategoryTabs active={activeCategory} setActive={setActiveCategory} />

      {/* ---------------- PRODUCTS GRID ---------------- */}
      <section>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[380px] bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </section>

      {/* ---------------- FEATURED PROMOTION ---------------- */}
      <section className="relative mt-16">
        <img
          src="https://images.unsplash.com/photo-1519741492775-3e14d3b1b92b?auto=format&fit=crop&w=1600&q=80"
          alt="Promotion Banner"
          className="w-full h-[300px] md:h-[400px] object-cover rounded-xl"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start md:items-center px-8 md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Summer Sale
          </h2>
          <p className="text-white text-lg md:text-xl">
            Up to 50% off on selected collections
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;