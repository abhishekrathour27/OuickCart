"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CustomBtn from "@/components/custom/CustomBtn";
import { useProduct } from "@/context/productContext";
import { ProductType } from "@/type/productDataType";
import { useCart } from "@/context/cartContext";

type LoginData = {
  name: string;
  email: string;
  password: string;
} | null;

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { fetchProductById } = useProduct();
  const { addToCart } = useCart();

  // ✅ null safe product state
  const [dataById, setDataById] = useState<ProductType | null>(null);
  const [imgIndex, setImgIndex] = useState<string>();

  // 🟢 Fetch product by ID
  const handleDataById = async () => {
    if (!id) return;
    const data = await fetchProductById(id as string);
    if (data) {
      setDataById(data);
      if (Array.isArray(data.image)) {
        setImgIndex(data.image?.[0]);
      } else if (typeof data.image === "string") {
        setImgIndex(data.image);
      }
    }
  };

  // console.log("cart",cartData)

  useEffect(() => {
    handleDataById();
  }, [id]);

  // ✅ Local storage safe loginData
  const loginData: LoginData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("login") || "null")
      : null;

  return (
    <div className="flex gap-12 mt-10 px-10">
      {/* Left Side - Product Images */}
      <div className="w-1/2 flex flex-col items-center">
        <div className="bg-gray-100 rounded-lg p-6">
          <img
            src={imgIndex}
            alt={dataById?.name || ""}
            className="w-[400px] h-[350px] object-contain bg-[#F3F4F6]"
          />
        </div>

        {/* Thumbnails */}
        {Array.isArray(dataById?.image) && (
          <div className="flex gap-4 mt-6">
            {dataById.image.map((img, index) => (
              <img
                onClick={() => setImgIndex(img)}
                key={index}
                src={img}
                alt={dataById?.name || ""}
                className="w-[80px] h-[80px] object-contain border rounded-lg cursor-pointer hover:shadow-md"
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Side - Product Details */}
      <div className="w-1/2">
        <h1 className="text-3xl font-semibold">{dataById?.name}</h1>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-orange-500 text-lg">★★★★☆</span>
          <span className="ml-2 text-gray-600">(4.5)</span>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700 leading-relaxed">
          {dataById?.description}
        </p>

        {/* Price */}
        <div className="mt-4 space-x-3">
          <span className="text-2xl font-bold">
            ${dataById?.offerPrice || dataById?.price}
          </span>
          {dataById?.offerPrice && (
            <span className="text-gray-500 line-through">
              ${dataById?.price}
            </span>
          )}
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
            {dataById?.category || "Product"}
          </p>
        </div>
        <div className="space-x-3 mt-5">
          <button
            onClick={() => id && addToCart(id as string)}
            className="px-4 py-2 w-40 bg-gray-300 text-black  rounded cursor-pointer"
          >
            Add to cart
          </button>
          <CustomBtn className="w-40">Buy now</CustomBtn>
        </div>
      </div>
    </div>
  );
};

export default Page;
