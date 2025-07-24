import React from 'react'

const CustomBtn = ({ children, className = "" }) => {
  return (
    <button
      className={`px-4 py-2 bg-[#EA580C] text-white rounded ${className}`}
    >
      {children}
    </button>
  )
}

export default CustomBtn