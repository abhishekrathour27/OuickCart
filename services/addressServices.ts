import api from "@/lib/api"
import { ApiUrl } from "./url.services"
import { toast } from "sonner";
import { AddressType } from "@/context/addressContext";
import { headers } from "next/headers";



export const addressServices = {
    createAddress: async (data: AddressType) => {

        const token = localStorage.getItem("token")
        try {
            const response = await api.post(`${ApiUrl}/address/create`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ token bhejna zaroori hai
                    },
                }
            );
            toast.success(response?.data?.message)
            return response?.data
        } catch (error: any) {
            toast.error(error.message)
        }
    },
    getAddress: async () => {
        const token = localStorage.getItem("token")
        try {
            const response = await api.get(`${ApiUrl}/address/get`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ token bhejna zaroori hai
                    },
                }
            )
            return response?.data
        } catch (error: any) {
            toast.error(error.message)
        }
    },
    deleteAddress: async (addressId: string) => {
        const token = localStorage.getItem("token");
        try {
            const response = await api.delete(`${ApiUrl}/address/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { id: addressId }
            });
            toast.success(response?.data?.message)
            return response?.data
        } catch (error: any) {
            toast.error(error.message)
        }
    },
    updateAddress: async (addressId: string, addressData: AddressType) => {
        const token = localStorage.getItem("token");
        try {
            const response = await api.put(
                `${ApiUrl}/address/update`,
                { id: addressId, updateData: addressData }, // <- ye hai data
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response?.data.message)
            return response
        } catch (error: any) {
            toast.error(error.message)
        }
    }
}