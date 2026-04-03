import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import ProductCard from "../components/ProductCard";

const Womens = () => {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {

      const res = await axiosInstance.get(
        "/product?category=WOMENS"
      );

      setProducts(res.data.products);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>

      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Women</h1>
        <p className="text-gray-500">
          Discover the latest women's fashion trends.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

    </div>
  );
};

export default Womens;