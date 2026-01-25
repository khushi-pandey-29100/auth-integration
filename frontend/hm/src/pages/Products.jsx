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


if (isLoading) return <p className="text-center">Loading...</p>;
if (isError) return <p className="text-center">Error loading products</p>;


return (
<div className="p-6">
<CategoryTabs active={category} setActive={setCategory} />


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
{data.map((product) => (
<ProductCard key={product._id} product={product} />
))}
</div>
</div>
);
};


export default Products;