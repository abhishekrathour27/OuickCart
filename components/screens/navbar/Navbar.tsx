"use client";
import CustomBtn from "@/components/custom/CustomBtn";
import { useModal } from "@/context/modalContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import AuthTab from "../auth/AuthTab";
type authType = {
  name : string , 
  email : string,
  password : string
}

const Navbar = () => {
  const [user,setUser]=useState<authType | null>(null)
  const router = useRouter();
  const { openModal } = useModal();
  const fetchLocalStorageData = () => {
    const loginData : authType  = JSON.parse(localStorage.getItem("login") || "null");
    setUser(loginData)
  };
  // console.log(user)
  const userName = user?.name;
  const firstLatter = userName?.charAt(0).toUpperCase();

  useEffect(() => {
    fetchLocalStorageData();
  }, []);


  return (
    
    <div>
      <div className="flex justify-around items-center h-16 border border-b-gray-300">
        <div className="cursor-pointer">
          <img src="logo.svg" alt="logo" />
        </div>
        <div>
          <ul className="flex gap-8">
            <li onClick={() => router.push("/")} className="cursor-pointer">
              Home
            </li>
            <li onClick={() => router.push("/shop")} className="cursor-pointer">
              Shop
            </li>
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Contact</li>
          </ul>
        </div>
        <div>
          {user ? (
            <div className="bg-[#374151] h-8 w-8 flex items-center justify-center text-white rounded-full cursor-pointer">
              <p>{firstLatter}</p>
            </div>
          ) : (
            <CustomBtn className="" onClick={() => openModal(<AuthTab />)}>Login</CustomBtn>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
