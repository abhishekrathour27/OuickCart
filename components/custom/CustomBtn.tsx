"use client";
import React from "react";

type CustomBtnProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className: string;
  disabled?: boolean; // ✅ correct spelling
  type?: "button" | "submit" | "reset"; // ✅ button type options
};

const CustomBtn = ({
  children,
  className = "",
  onClick,
  disabled,
  type,
}: CustomBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-[#EA580C] text-white  rounded cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomBtn;
