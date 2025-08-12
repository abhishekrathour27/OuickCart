import React from 'react'

const CustomBtn = ({ children, className = "" , onClick }) => {
  return (
    <button
      onClick={ onClick}
      className={`px-4 py-2 bg-[#EA580C] text-white rounded cursor-pointer ${className}`}
    >
      {children}
    </button>
  )
}

export default CustomBtn