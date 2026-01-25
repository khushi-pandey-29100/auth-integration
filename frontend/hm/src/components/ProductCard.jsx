const ProductCard = ({ product }) => {

return (
    <div className="border rounded-lg p-3 shadow-sm">
        <img
            src={product.images[0]}
            alt={product.productName}
            className="w-full h-64 object-cover rounded"
            onError={(e) => {
                e.target.src = "/images/placeholder.jpg";
            }}
        />
        <h3 className="mt-2 font-semibold">{product.productName}</h3>
        <p className="text-gray-600">₹{product.price.amount}</p>
    </div>
);
};
export default ProductCard;