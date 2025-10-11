"use client";
import React, { useState } from "react";
import { CircleFadingPlus, ListCheck, SquareCheckBig } from "lucide-react";
import CustomBtn from "@/components/custom/CustomBtn";
import { useForm } from "react-hook-form";
import { productInputSchema, productInputType } from "./validation/adminSchema"; // ✅ your zod/yup schema type
import { yupResolver } from "@hookform/resolvers/yup";
import productService from "@/services/productService";
import { toast } from "sonner";
import { logout } from "@/services/authServices";
import { useProduct } from "@/context/productContext";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("add");
  const { products , deleteProductById } = useProduct();

  // initialize form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<productInputType>({
    resolver: yupResolver(productInputSchema),
  });

  const submit = async (data: productInputType) => {
    // console.log("data")
    try {
      const response = await productService.addProduct(data);
      toast(response?.message);
      return response;
    } catch (error: any) {
      toast(error.message);
    }
  };

  const logoutData = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
    } catch (error) {
      console.error("logout error", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white">
        {/* Top logo and logout */}
        <div className="flex justify-between items-center h-16 border-b border-gray-300 px-4">
          <img src="/logo.svg" alt="logo" className="w-24 cursor-pointer" />
          <CustomBtn onClick={() => logoutData()} className="px-4 py-1 text-sm">
            Logout
          </CustomBtn>
        </div>

        {/* Sidebar menu */}
        <div className="flex flex-col mt-4 space-y-2 text-slate-700">
          <button
            onClick={() => setActiveTab("add")}
            className={`flex items-center gap-3 px-6 py-3 rounded-r-full cursor-pointer ${
              activeTab === "add" ? "bg-orange-100 text-orange-600" : ""
            }`}
          >
            <CircleFadingPlus size={20} /> Add Product
          </button>

          <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-3 px-6 py-3 rounded-r-full cursor-pointer ${
              activeTab === "list" ? "bg-orange-100 text-orange-600" : ""
            }`}
          >
            <ListCheck size={20} /> Product List
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 px-6 py-3 rounded-r-full cursor-pointer ${
              activeTab === "orders" ? "bg-orange-100 text-orange-600" : ""
            }`}
          >
            <SquareCheckBig size={20} /> Orders
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-10 overflow-y-auto">
        {activeTab === "add" && (
          <form
            onSubmit={handleSubmit(submit)}
            className="space-y-6 bg-white shadow-sm p-8 rounded-lg w-[90%] mx-auto"
          >
            <h1 className="text-xl font-semibold text-slate-700 mb-4">
              Add Product
            </h1>

            {/* Product Image */}
            <div className="space-y-2">
              <h2 className="font-medium text-slate-600">Product Image</h2>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 cursor-pointer hover:border-orange-400"
                  >
                    <span className="text-sm">Upload</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Name */}
            <div className="flex flex-col">
              <label className="font-medium text-slate-700">Product Name</label>
              <input
                type="text"
                placeholder="Type here"
                {...register("name")}
                className="px-5 py-2 w-2/3 border rounded focus:outline-orange-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Product Description */}
            <div className="flex flex-col">
              <label className="font-medium text-slate-700">
                Product Description
              </label>
              <textarea
                placeholder="Type here"
                {...register("description")}
                className="px-5 py-2 w-2/3 border rounded h-28 focus:outline-orange-400"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category, Price, Offer Price */}
            <div className="flex gap-5 items-center">
              <div className="flex flex-col">
                <label className="font-medium text-slate-700">Category</label>
                <select
                  {...register("category")}
                  className="border border-slate-200 px-3 py-2 rounded focus:outline-orange-400"
                >
                  <option value="">Select Category</option>
                  <option value="Earphone">Earphone</option>
                  <option value="Headphone">Headphone</option>
                  <option value="Watch">Watch</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Laptop">Laptop</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-slate-700">
                  Product Price
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  {...register("price")}
                  className="px-5 py-2 border rounded focus:outline-orange-400"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-slate-700">
                  Offer Price
                </label>
                <input
                  type="number"
                  placeholder="Enter offer price"
                  {...register("offerPrice")}
                  className="px-5 py-2 border rounded focus:outline-orange-400"
                />
                {errors.offerPrice && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.offerPrice.message}
                  </p>
                )}
              </div>
            </div>

            <CustomBtn className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 mt-4">
              ADD
            </CustomBtn>
          </form>
        )}
        <div>
          {activeTab === "list" && (
            <div className="space-y-4">
              {/* Header */}
              <div className="grid grid-cols-4 items-center bg-slate-100 border border-slate-400 rounded-lg px-6 py-3 font-semibold text-slate-700">
                <span>Product</span>
                <span>Category</span>
                <span>Price</span>
                <span>Action</span>
              </div>

              {/* Product Rows */}
              <div className="space-y-3">
                {products.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-4 items-center border border-slate-300 rounded-lg px-6 py-3 hover:bg-slate-50 transition"
                  >
                    {/* Product */}
                    <div className="flex items-center gap-3">
                      <img
                        src={item?.image?.[0]}
                        alt={item?.name}
                        className="w-14 h-14 object-cover rounded-md border"
                      />
                      <span className="font-medium">{item?.name}</span>
                    </div>

                    {/* Category */}
                    <span className="text-slate-600">{item?.category}</span>

                    {/* Price */}
                    <span className="font-semibold text-green-600">
                      ₹{item?.offerPrice}
                    </span>

                    {/* Action */}
                    <button onClick={()=> deleteProductById(item._id)}
                     className="px-3 py-2 w-30 cursor-pointer bg-red-500 text-white text-sm rounded-md hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
