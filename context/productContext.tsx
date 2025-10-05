"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import productService from "../services/productService";
import { toast } from "sonner";

// 🔹 Product type
export interface Product {
  _id: string;
  name: string;
  price: number;
  offerPrice: number;
  description: string;
  category: string;
  image?: string;
}

// 🔹 Context type
interface ProductContextType {
  products: Product[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  wishlistProduct: Product[];
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  handleAddWishlist: (productId: string) => Promise<Product | null>;
  removeFromWishlist: (productId: string) => Promise<Product | null>;
  
}

// 🔹 Context create
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [wishlistProduct, setWishlistProduct] = useState<Product[]>([]); // ✅ FIXED

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getWishlistProduct();
    }
  }, []);

  // 🟢 fetch all products
  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await productService.getAllProduct();
      setProducts(response);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 fetch single product by ID
  const fetchProductById = async (id: string): Promise<Product | null> => {
    try {
      setLoading(true);
      const response = await productService.getProductById(id);
      return response.data;
    } catch (err) {
      console.error("Error fetching product:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🟢 add product to wishlist
  const handleAddWishlist = async (
    productId: string
  ): Promise<Product | null> => {
    try {
      const response = await productService.addToWishlist(productId);
      
      // Find the product from products array
      const addedProduct = products.find(p => p._id === productId);
      if (addedProduct && !wishlistProduct.some(p => p._id === productId)) {
        setWishlistProduct(prev => [...prev, addedProduct]);
      }
      return response?.data;
    } catch (error: any) {
      toast.error(error.message);
      return null;
    }
  };

  // 🟢 get wishlist products
  const getWishlistProduct = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await productService.getWishList();
      setWishlistProduct(response?.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (
    productId: string
  ): Promise<Product | null> => {
    try {
      const response = await productService.removeFromWishlist(productId);
      
      // Update local state directly
      setWishlistProduct(prev => prev.filter(p => p._id !== productId));
      return response?.data;
    } catch (error: any) {
      toast.error(error.message);
      return null;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        setLoading,
        wishlistProduct,
        fetchProducts,
        fetchProductById,
        handleAddWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
