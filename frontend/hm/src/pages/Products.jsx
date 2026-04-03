import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory } from "../api/products";
import ProductCard from "../components/ProductCard";
import CategoryTabs from "../components/CategoryTabs";

const Products = () => {

  const [category, setCategory] = useState("WOMENS");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProductsByCategory(category),
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-wide mb-3">
          Explore Collections
        </h1>

        <p className="text-gray-500 text-sm">
          Discover the latest fashion trends for every style.
        </p>
      </div>

      {/* Category Tabs */}
      <CategoryTabs active={category} setActive={setCategory} />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[380px] bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="text-center text-red-500 mt-10">
          Error loading products
        </p>
      )}

      {/* Product Grid */}
      {!isLoading && data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
          {data.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Products;