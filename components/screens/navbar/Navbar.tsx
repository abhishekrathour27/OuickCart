"use client"
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-around items-center h-16 border border-b-gray-300">
        <div className="cursor-pointer">
          <img src="logo.svg" alt="logo" />
        </div>
        <div>
          <ul className="flex gap-8">
            <li onClick={()=> router.push("/")} className="cursor-pointer">Home</li>
            <li onClick={()=> router.push("/shop")} className="cursor-pointer">Shop</li>
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Contact</li>
          </ul>
        </div>
        <div className="bg-[#374151] h-8 w-8 flex items-center justify-center text-white rounded-full cursor-pointer">
          <p>A</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
