"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";
import cartServices from "@/services/cartServices";
import { CartItemResponseType, ProductID } from "@/type/productDataType";

type CartContextType = {
  data: CartItemResponseType[];
  loading: boolean;
  getCartData: () => Promise<void>;
  addToCart: (productId: string) => Promise<CartItemResponseType | null>;
  removeFromCart?: (productId: string) => Promise<void>;
  decreaseCartData?: (productID: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<CartItemResponseType[]>([]);
  const [loading, setLoading] = useState(false);

  // 🟢 Get Cart Data
  const getCartData = async () => {
    try {
      setLoading(true);
      const response = await cartServices.getCartData();

      // console.log("rse",response.data.items)
      setData(response?.data?.items);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (
    productId: string
  ): Promise<CartItemResponseType | null> => {
    try {
      const response = await cartServices.addToCart(productId);
      toast.success("Added to cart!");
      await getCartData();
      return response?.data;
    } catch (error: any) {
      toast.error(error.message || "Failed to add to cart");
      return null;
    }
  };
  const removeFromCart = async (productId: string) => {
    try {
      const response = await cartServices.removeCartData(productId);
      console.log("rem", response);
      await getCartData();
      toast.success("product removed from the cart");
      // return response;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const decreaseCartData = async (productId: string) => {
    try {
      const response = await cartServices.decreaseFromCart(productId);
      await getCartData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // optional: removeFromCart, clearCart, increase/decrease quantity bhi add kar sakte ho

  useEffect(() => {
    getCartData(); // mount pe cart fetch
  }, []);


  return (
    <CartContext.Provider
      value={{ data, loading, getCartData, addToCart, removeFromCart , decreaseCartData }}
    >
      {children}
    </CartContext.Provider>
  );
};

// hook for easy use
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
