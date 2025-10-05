"use client";
import { useProduct } from "@/context/productContext";
import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/context/cartContext";

const WishlistPage = () => {
  const { wishlistProduct, loading, removeFromWishlist } = useProduct();
  const { addToCart } = useCart();

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading wishlist...</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 w-full md:w-[70%]">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Wishlist ❤️</h1>

      {wishlistProduct?.length ? (
        <div className="flex flex-col gap-6">
          {wishlistProduct?.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-center md:items-stretch border rounded-2xl shadow-sm hover:shadow-md transition bg-white"
            >
              {/* Product Image */}
              <div className="flex-shrink-0 p-4">
                <img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="w-28 h-28 object-contain rounded-md"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {item.description}
                </p>
                <p className="mt-2 text-lg font-bold text-blue-600">
                  ₹{item.price}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-row md:flex-col gap-3 p-4">
                <button
                  onClick={() => {
                    addToCart(item._id);
                    removeFromWishlist(item._id);
                  }}
                  className="flex items-center justify-center gap-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                >
                  <ShoppingCart size={16} />
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="flex items-center justify-center gap-2 cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-lg mt-10">
          Your wishlist is empty 🛒
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
