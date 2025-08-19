"use client"
import React from "react";

type CustomBtnProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className: string; 
  disable? : ()=> void// <-- lowercase and optional
};

const CustomBtn = ({
  children,
  className = "",
  onClick,
  disable
}: CustomBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-[#EA580C]  rounded cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomBtn;
