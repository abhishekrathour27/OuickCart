"use client";
import React, { useEffect, useState } from "react";
import { ProductType } from "@/type/productDataType";
import { Heart, Star } from "lucide-react";
import CustomBtn from "@/components/custom/CustomBtn";
import { useRouter } from "nextjs-toploader/app";
import { useProduct } from "@/context/productContext";
import Loader from "../../custom/Loader";
import { usePathname } from "next/navigation";

const Products = () => {
  const [rating, setRating] = useState<{ [key: string]: number }>({});
  const [hover, setHover] = useState<{ [key: string]: number }>({});
  const [modal, setModal] = useState(false);
  const [modalProduct, setModalProduct] = useState<ProductType | null>(null);
  const [index, setIndex] = useState(5);
  const [showLoader, setShowLoader] = useState(true); // ✅ local loader state

  const router = useRouter();
  const {
    products,
    loading,
    handleAddWishlist,
    wishlistProduct,
    removeFromWishlist,
  } = useProduct();

  // delay effect (minimum 1.5 sec loader)
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowLoader(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const ratingById = (id: string, star: number) => {
    setRating((prev) => ({ ...prev, [id]: star }));
  };

  const handleHover = (id: string, star: number) => {
    setHover((prev) => ({ ...prev, [id]: star }));
  };

  const pathname = usePathname(); // 👉 e.g. "/shop"

  // remove leading "/" and split by "/"
  const routePart = pathname.split("/")[1]; // 👉 "shop"

  const visibleProducts =
    routePart === "shop" ? products : products.slice(0, index);

  return (
    <div className="mt-8 lg:w-[78vw] flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold ml-2">Popular Products</h1>

      {/* 👇 Loader only inside products grid */}
      {loading || showLoader ? (
        <div className="w-full flex justify-center items-center py-10">
          <Loader fullPage={false} />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5">
          {visibleProducts?.map((data) => (
            <div
              key={data._id}
              className="text-sm w-fit p-3 space-y-1 cursor-pointer"
            >
              <div className="bg-[#F0F0F2] w-[20vw] lg:w-[13vw] rounded-xl relative">
                {/* Wishlist Icon */}
                {wishlistProduct?.some((item) => item._id === data._id) ? (
                  <button
                    onClick={() => removeFromWishlist(data._id)}
                    className="absolute top-2 right-2 p-1 rounded-full cursor-pointer bg-white shadow-md hover:scale-110 transition"
                  >
                    <Heart className="text-orange-400 fill-orange-400 w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddWishlist(data._id)}
                    className="absolute top-2 right-2 p-1 rounded-full cursor-pointer bg-white shadow-md hover:scale-110 transition"
                  >
                    <Heart className="text-orange-400 w-5 h-5" />
                  </button>
                )}

                <img
                  src={data.image?.[0] || "/placeholder-image.png"}
                  alt={data.name}
                  onClick={() => router.push(`/product/${data._id}`)}
                  className="w-[170px] transition-transform duration-300 cursor-pointer ease-in-out hover:scale-105 rounded-xl"
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
      )}

      {/* Load More */}
      {index < products.length &&
        !loading &&
        !showLoader &&
        routePart !== "shop" && (
          <button
            onClick={() => setIndex(index + 5)}
            className="bg-gray-200 text-slate-500 cursor-pointer text-lg w-fit px-4 mt-2 py-2 rounded-full "
          >
            more
          </button>
        )}

      {/* Modal */}
      {modal && modalProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl h-fit w-[20vw] space-y-3">
            <div className="bg-[#F0F0F2] rounded-lg w-fit">
              <img
                src={modalProduct.image?.[0] || "/placeholder-image.png"}
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
                className="rounded-full cursor-pointer text-white"
              >
                Cancel
              </CustomBtn>
              <CustomBtn
                onClick={() => router.push(`/product/${modalProduct._id}`)}
                className="rounded-full cursor-pointer text-white"
              >
                Buy now
              </CustomBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
