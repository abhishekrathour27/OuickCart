"use client";
import { ProductType } from "@/type/productDataType";
import { createContext, useState, ReactNode, useContext } from "react";

// type of context
type CartContextType = {
  cartData: ProductType[];
  handleCartData: (item: ProductType) => void;
  increaseCart: (id: string) => void;
  decreaseCart: (id: string) => void;
  setCartData: React.Dispatch<React.SetStateAction<ProductType[]>>;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartData, setCartData] = useState<ProductType[]>([]);
  const [myOrder, setMyOrder] = useState<ProductType[]>([]);

  const handleCartData = (item: ProductType) => {
    setCartData((prev) => {
      const existsData = prev.some((product) => product._id === item._id);

      if (existsData) {
        return prev.map((product) =>
          product._id === item._id
            ? { ...product, quantity: (product.quantity || 1) + 1 }
            : product
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  const increaseCart = (id: string) => {
    setCartData((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };
  const decreaseCart = (id: string) => {
    setCartData((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // console.log(cartData);

  return (
    <CartContext.Provider
      value={{
        cartData,
        handleCartData,
        increaseCart,
        decreaseCart,
        setCartData,
      }}
    >
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
