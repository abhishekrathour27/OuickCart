"use client";
import CustomBtn from "@/components/custom/CustomBtn";
import { useModal } from "@/context/modalContext";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useRef, useState } from "react";
import AuthTab from "../auth/AuthTab";
import {
  CircleUserRound,
  LogOut,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
type authType = {
  name: string;
  email: string;
  password: string;
};

const Navbar = () => {
  const [user, setUser] = useState<authType | null>(null);
  const [profileModal, setProfileModal] = useState(false);
  const router = useRouter();

  const modalRef = useRef<HTMLDivElement | null>(null);


useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setProfileModal(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  const { openModal } = useModal();
  const fetchLocalStorageData = () => {
    const loginData: authType = JSON.parse(
      localStorage.getItem("login") || "null"
    );
    setUser(loginData);
  };
  // console.log(user)
  const userName = user?.name;
  const firstLatter = userName?.charAt(0).toUpperCase();

  useEffect(() => {
    fetchLocalStorageData();
  }, []);

  const logoutData = ()=>{
    localStorage.removeItem('login');
  }

  return (
    <div>
      <div className="flex justify-around items-center h-16 border border-b-gray-300">
        <div className="cursor-pointer">
          <img src="logo.svg" alt="logo" />
        </div>
        <span></span>
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
        <div className="relative">
          {user ? (
            <div
              onClick={() => setProfileModal(true)}
              className="bg-[#374151] h-8 w-8 flex items-center justify-center text-white rounded-full cursor-pointer"
            >
              <p>{firstLatter}</p>
            </div>
          ) : (
            <CustomBtn className="" onClick={() => openModal(<AuthTab />)}>
              Login
            </CustomBtn>
          )}
          {profileModal && (
            <>
            
              <div ref={modalRef} className="absolute top-15 right-5 border h-[35vh] w-[25vw] bg-white shadow-xl rounded-lg flex flex-col z-50">
                {/* Profile Section */}
                <div className="flex items-center p-4 gap-5 border-b">
                  <CircleUserRound size={40} />
                  <div>
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                  </div>
                </div>

                {/* First div */}
                <div
                  onClick={() => {
                    router.push("/product/cart");
                    setProfileModal(false);
                  }}
                  className="flex gap-2 p-4 border-b hover:bg-gray-100 cursor-pointer"
                >
                  <ShoppingCart />
                  <p className="text-gray-500">Cart</p>
                </div>

                {/* Second div */}
                <div className="flex gap-2 items-center p-4 border-b hover:bg-gray-100 cursor-pointer">
                  <ShoppingBag />
                  <p className=" text-gray-500">My orders</p>
                </div>

                {/* Third div */}
                <div onClick={()=> {
                  logoutData();
                  router.push('/')
                  setProfileModal(false)
                }}
                className="flex gap-2 p-4 hover:bg-gray-100 cursor-pointer text-red-600">
                  <LogOut />
                  <p className="font-medium">Logout</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
