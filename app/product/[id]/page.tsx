"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/data/data";
import CustomBtn from "@/components/custom/CustomBtn";
import { useCart } from "@/context/cartContext";
import { ProductType } from "@/type/productDataType";
import { toast } from "sonner";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { handleCartData, cartData } = useCart();
  const newProduct = products.find((item) => item._id === id) as
    | ProductType
    | undefined;

  if (!newProduct) {
    return <div className="text-red-500">❌ Product not found</div>;
  }
  const [imgIndex, setImgIndex] = useState(newProduct.image[0]);
  const matchCartData = cartData.some((item) => item._id === newProduct._id);

  const addToCart = () => {
    handleCartData(newProduct);
    toast.success("Item added to cart");
  };
  console.log(cartData);

  return (
    <div className="flex gap-12 mt-10 px-10">
      {/* Left Side - Product Images */}
      <div className="w-1/2 flex flex-col items-center">
        <div className="bg-gray-100 rounded-lg p-6">
          <img
            src={Array.isArray(newProduct.image) ? imgIndex : newProduct.image}
            alt={newProduct.name}
            className="w-[400px] h-[350px] object-contain bg-[#F3F4F6]"
          />
        </div>

        {/* Thumbnails */}
        {Array.isArray(newProduct.image) && (
          <div className="flex gap-4 mt-6">
            {newProduct.image.map((img, index) => (
              <img
                onClick={() => setImgIndex(img)}
                key={index}
                src={img}
                alt={newProduct.name}
                className="w-[80px] h-[80px] object-contain border rounded-lg cursor-pointer hover:shadow-md"
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Side - Product Details */}
      <div className="w-1/2">
        <h1 className="text-3xl font-semibold">{newProduct.name}</h1>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-orange-500 text-lg">★★★★☆</span>
          <span className="ml-2 text-gray-600">(4.5)</span>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700 leading-relaxed">
          {newProduct.description}
        </p>

        {/* Price */}
        <div className="mt-4 space-x-3">
          <span className="text-2xl font-bold">${newProduct.offerPrice}</span>
          <span className="text-gray-500 line-through">
            ${newProduct.price}
          </span>
        </div>

        {/* Extra Info */}
        <div className="mt-6 border-t border-gray-300 pt-4 space-y-2 text-gray-700">
          <p>
            <span className="font-medium w-20 inline-block">Brand:</span>{" "}
            {"Generic"}
          </p>
          <p>
            <span className="font-medium w-20 inline-block">Color:</span>{" "}
            {"Multi"}
          </p>
          <p>
            <span className="font-medium w-20 inline-block">Category:</span>{" "}
            {"Product"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          {matchCartData ? (
            <CustomBtn
              onClick={() => router.push("/cart")}
              className="w-1/2 bg-slate-200 text-gray-600"
            >
              Go to cart
            </CustomBtn>
          ) : (
            <CustomBtn
              onClick={() => addToCart()}
              className="w-1/2 bg-slate-200 text-gray-600"
            >
              Add to cart
            </CustomBtn>
          )}

          <CustomBtn
            onClick={() => {
              addToCart();
              router.push("/cart");
            }}
            className="w-1/2 bg-orange-500 text-white hover:bg-orange-600"
          >
            Buy now
          </CustomBtn>
        </div>
      </div>
    </div>
  );
};

export default Page;
