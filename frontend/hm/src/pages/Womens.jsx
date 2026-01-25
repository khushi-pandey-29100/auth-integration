import React, { useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";

const Womens = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await axiosInstance.get("product?category=WOMENS", {
        withCredentials: true,
      });
      if (res) setProducts(res.data.products);
    } catch (error) {
      console.log("Error fetching WOMENS products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Womens Products</h1>
        {products.length === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={product.images[0]}
                  alt={product.productName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-1">
                    {product.productName}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <p className="font-medium">
                    Price: {product.price.currency} {product.price.amount}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Sizes: {product.sizes.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Colors: {product.colors.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Womens;
