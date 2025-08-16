"use client"
import { ProductType } from "@/type/productDataType";
import { createContext, useState, ReactNode, useContext } from "react";

// type of context
type CartContextType = {
  cartData: ProductType[];
  handleCartData: (item: ProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartData, setCartData] = useState<ProductType[]>([]);

  const handleCartData = (item: ProductType) => {
    setCartData((prev) => [...prev, item]);
  };

  // console.log(cartData);

  return (
    <CartContext.Provider value={{ cartData, handleCartData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within the CartProvider");
  }
  return context;
};
