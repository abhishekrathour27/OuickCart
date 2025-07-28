// filepath: d:\codes\QuickCart\my-app\components\screens\products\Products.tsx
import React from "react";
import { products } from "@/data/data";
// import { motion } from "framer-motion"; // Correct import

const Products = () => {
  return (
    <div>
      <div className="mt-8 w-[77vw]">
        <h1 className="text-2xl font-semibold ml-2">Popular Products</h1>
        <div className="grid grid-cols-5 ">
          {products.map((data) => (
            <div
              key={data._id}
              className="text-sm w-fit p-3 space-y-1 cursor-pointer"
            >
              <div className="bg-[#F0F0F2] w-fit rounded-xl">
                <img
                  src={data.image[0]}
                  alt={data.name}
                  className="w-[200px]"
                />
              </div>
              <p className="font-semibold">{data.name}</p>
              <p className="text-sm text-gray-500">
                {data.description.split(" ").slice(0, 4).join(" ")}..
              </p>
              <div className="text-xl">
                <span className="text-orange-500">★★★★</span>☆
              </div>
              <div className="space-x-2">
                <span className="text-base">${data.price}</span>
                <button className="border px-2 text-sm border-gray-400 py-1 rounded-full cursor-pointer">
                  Buy now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
