"use client";
import { useCart } from "@/context/cartContext";
import React, { useState } from "react";
import { useModal } from "@/context/modalContext";
import Address from "@/components/screens/select_address/Address";
import { useProduct } from "@/context/productContext";
import { useRouter } from "next/navigation";
import { useAddress } from "@/context/addressContext";

const Page = () => {
  const { data, removeFromCart , addToCart , decreaseCartData } = useCart();
  const { products } = useProduct();
  const [addressModal, setAddressModal] = useState(false);
  const { openModal } = useModal();
  const router = useRouter();

  const {addresses }= useAddress()

  // console.log("object", cartData);

  const totalPrice = data?.reduce(
    (acc, item) => acc + item.productId?.offerPrice * item.quantity,
    0
  );
  // console.log('totoal' , totalPrice)
  const taxPrice = Number(((totalPrice * 2) / 100).toFixed(2));

  // console.log("address", address);
  console.log("cartd", addresses);
  return (
    <div className="flex justify-center mt-10">
      {/* Cart Section */}
      <div className="w-[65vw]">
        {/* Heading */}
        <h1 className="text-4xl font-semibold">
          Your <span className="text-orange-500">Cart</span>
        </h1>

        {/* Header Row */}
        <div className="grid grid-cols-[1.7fr_1fr_1fr_1fr] border-b mt-5 pb-3">
          <span className="font-semibold text-lg">Product Details</span>
          <span className="font-semibold text-lg">Price</span>
          <span className="font-semibold text-lg">Quantity</span>
          <span className="font-semibold text-lg">Subtotal</span>
        </div>

        {/* Cart Items */}
        {data?.length > 0 ? (
          data?.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-[1.7fr_1fr_1fr_1fr] items-center py-5 border-b"
              >
                {/* Product Details */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId?.image?.[0]}
                    alt={item.productId?.name}
                    className="w-[100px] rounded"
                  />
                  <div>
                    <p className="font-medium">{item.productId?.name}</p>
                    <button
                      onClick={() => removeFromCart?.(item.productId._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <span className="text-gray-700">
                  ${item.productId?.offerPrice}
                </span>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button 
                    disabled={item.quantity === 1}
                    onClick={() => decreaseCartData?.(item.productId._id)}
                    className="px-2 border cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center border">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item.productId._id)}
                    className="px-2 border cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <span className="text-gray-700">
                  ${(item.productId?.offerPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Image */}
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-svg-download-png-6024626.png" // replace with actual path
              alt="Empty Cart"
              className="w-64 h-64 object-contain mb-6"
            />

            {/* Heading */}
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Your cart seems to be empty
            </h2>

            {/* Subheading */}
            <p className="text-gray-500 text-center mb-6 px-4">
              Looks like you haven't added any items yet. Explore our collection
              and find something you love!
            </p>

            {/* Browse Button */}
            <button
              onClick={() => router.push("/shop")}
              className="bg-gradient-to-r cursor-pointer from-purple-500 to-blue-400 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              Browse Books
            </button>
          </div>
        )}

        {/* Continue Shopping */}
        <div className="mt-5">
          <button className="text-orange-500 flex items-center gap-2 hover:underline">
            ← Continue Shopping
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-[25vw] bg-gray-100 p-6 ml-10 space-y-5">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        {/* Select Address */}
        <div>
          <p className="text-gray-700 font-medium mb-2">SELECT ADDRESS</p>
          <button
            onClick={() => {
              setAddressModal(!addressModal);
            }}
            className="w-full border p-2 text-left cursor-pointer"
          >
            Select Address
          </button>
          {addressModal && (
            <div
              onClick={() => openModal(<Address mode="create"  />)}
              className="w-full border border-black p-2 text-left cursor-pointer"
            >
              ADD ADDRESS +
            </div>
          )}
        </div>
        {/* Promo Code */}
        <div>
          <p className="text-gray-700 font-medium mb-2">PROMO CODE</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="border flex-1 p-2"
            />
            <button className="bg-orange-500 text-white px-4">Apply</button>
          </div>
        </div>
        Price Details
        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Price</span>
            <span>${totalPrice?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${taxPrice}</span>
          </div>
        </div>
        {/* Total */}
        <div className="flex justify-between font-semibold text-lg border-t pt-4">
          <span>Total</span>
          <span>{(totalPrice + taxPrice).toFixed(2)}</span>
        </div>
        {/* Place Order */}
        <button
          className="w-full bg-orange-500 text-white py-3 font-semibold cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Page;
