"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { addressServices } from "@/services/addressServices";

// 🔹 Address type
export interface AddressType {
  _id: string;
  // userId: string;
  name: string;
  phoneNo: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string | null | undefined;
  isDefault: boolean;
}

// 🔹 Context type
interface AddressContextType {
  addresses: AddressType[];
  setAddresses: React.Dispatch<React.SetStateAction<AddressType[]>>;
  deleteAddress: (addressId: string) => Promise<void>;
  updateAddress: (addressId: string, addressData: AddressType) => Promise<void>;
}

// 🔹 Create Context
export const AddressContext = createContext<AddressContextType | undefined>(
  undefined
);

// 🔹 Provider
export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<AddressType[]>([]);

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    const response = await addressServices.getAddress();
    setAddresses(response?.data || []); // ✅ replace instead of append
  };

  const deleteAddress = async (addressId: string) => {
    const response = await addressServices.deleteAddress(addressId);
    setAddresses((prev) => prev.filter((item) => item._id !== addressId));
    return response;
  };

  const updateAddress = async (addressId: string, addressData: AddressType) => {
    await addressServices.updateAddress(addressId, addressData);
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        setAddresses,
        deleteAddress,
        updateAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within a ProductProvider");
  }
  return context;
};
