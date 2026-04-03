// ProductCard.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.productName} added to cart!`);
  };

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-[350px] overflow-hidden">
        <img
          src={hovered ? product.images?.[1] || product.images?.[0] : product.images?.[0]}
          alt={product.productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition duration-300 rounded"
        >
          ADD TO CART
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold tracking-wide text-gray-800 line-clamp-1">
          {product.productName}
        </h3>
        <p className="text-xs text-gray-400 mt-1 tracking-widest uppercase">
          {product.category}
        </p>
        <p className="text-lg font-bold mt-2 text-black">
          {product.price?.currency} {product.price?.amount}
        </p>
      </div>

      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ProductCard;