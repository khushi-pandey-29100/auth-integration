import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import ProductCard from "../components/ProductCard";

const Mens = () => {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {

      const res = await axiosInstance.get(
        "/product?category=MENS"
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

      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Men</h1>
        <p className="text-gray-500">
          Explore modern menswear and essentials.
        </p>
      </div>

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

export default Mens;