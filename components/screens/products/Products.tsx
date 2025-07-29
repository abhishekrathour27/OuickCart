"use client";
import React, { useState } from "react";
import { products } from "@/data/data";
import { Star } from "lucide-react";
import { data, div } from "framer-motion/client";
import CustomBtn from "@/components/custom/CustomBtn";

const Products = () => {
  const [rating, setRating] = useState<{ [key: number]: number }>({});
  const [hover, setHover] = useState<{ [key: number]: number }>({});
  const [modal, setModal] = useState(false);
  const [modalProduct, setModalProduct] = useState({});

  const ratingById = (id: number, star: number) => {
    setRating((prev) => ({ ...prev, [id]: star }));
  };

  const handleHover = (id: number, star: number) => {
    setHover((prev) => ({ ...prev, [id]: star }));
  };

  return (
    <div>
      <div className="mt-8 w-[77vw]">
        <h1 className="text-2xl font-semibold ml-2">Popular Products</h1>
        <div className="grid grid-cols-5">
          {products.map((data) => (
            <div
              key={data._id}
              className="text-sm w-fit p-3 space-y-1 cursor-pointer"
            >
              <div className="bg-[#F0F0F2] w-fit rounded-xl">
                <img
                  src={data.image[0]}
                  alt={data.name}
                  className="w-[200px] transition-transform duration-300 ease-in-out hover:scale-105 "
                />
              </div>
              <p className="font-semibold">{data.name}</p>
              <p className="text-sm text-gray-500">
                {data.description.split(" ").slice(0, 4).join(" ")}..
              </p>

              {/* Stars */}
              <div className="text-sm flex relative">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <div
                    key={index}
                    onClick={() => ratingById(data._id, star)}
                    onMouseOver={() => handleHover(data._id, star)}
                    onMouseLeave={() =>
                      setHover((prev) => ({ ...prev, [data._id]: 0 }))
                    }
                    className={`cursor-pointer ${
                      star <= (hover[data._id] || rating[data._id] || 0)
                        ? "text-amber-500"
                        : "text-gray-300"
                    }`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                ))}
              </div>

              <div className="space-x-2">
                <span className="text-base">${data.price}</span>
                <button
                  onClick={() => {
                    setModalProduct(data);
                    setModal(true);
                  }}
                  className="border px-2 text-sm border-gray-400 py-1 rounded-full cursor-pointer"
                >
                  Buy now
                </button>
              </div>
            </div>
          ))}
        </div>
        {modal && modalProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl h-fit w-[20vw] space-y-3">
              <div className="bg-[#F0F0F2] rounded-lg w-fit">
                <img
                  src={modalProduct.image[0]}
                  alt={modalProduct.name}
                  className="w-[250px]"
                />
              </div>
              <p className="font-semibold">{modalProduct.name}</p>
              <p>{modalProduct.description.split(" ").slice(0, 13).join(" ")}</p>
              <span className="font-semibold">${modalProduct.price}</span>
              <div className="flex justify-between mt-5">
                <CustomBtn
                  onClick={() => setModal(false)}
                  className="rounded-full cursor-pointer"
                >
                  Cancel
                </CustomBtn>
                <CustomBtn className="rounded-full cursor-pointer">Buy now</CustomBtn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
