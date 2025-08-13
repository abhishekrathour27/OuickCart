"use client"
import React from "react";

type CustomBtnProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className: string; // <-- lowercase and optional
};

const CustomBtn = ({
  children,
  className = "",
  onClick,
}: CustomBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-[#EA580C] text-white rounded cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomBtn;
