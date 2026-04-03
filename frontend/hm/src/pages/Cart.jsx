import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + (item.price?.amount || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ---------------- Cart Items ---------------- */}
          <div className="flex-1 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                {/* Product Image */}
                <img
                  src={item.images?.[0]}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Product Details */}
                <div className="flex-1 px-4">
                  <h2 className="text-lg font-semibold">{item.productName}</h2>
                  <p className="text-sm text-gray-500 uppercase">{item.category}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.price?.currency} {item.price?.amount}
                  </p>

                  {/* Quantity Selector */}
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item._id,
                            quantity: Math.max((item.quantity || 1) - 1, 1),
                          })
                        )
                      }
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border rounded">{item.quantity || 1}</span>
                    <button
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item._id,
                            quantity: (item.quantity || 1) + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="text-red-600 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* ---------------- Summary ---------------- */}
          <div className="w-full lg:w-96 bg-gray-50 p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between text-lg mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-lg mb-2">
              <span>Estimated Shipping</span>
              <span>₹99</span>
            </div>
            <div className="border-t my-3"></div>
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Total</span>
              <span>₹{total + 99}</span>
            </div>
            <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;