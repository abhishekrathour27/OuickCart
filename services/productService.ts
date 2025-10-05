import api from "@/lib/api"
import { ApiUrl } from "./url.services"
import { toast } from "sonner"
import { productInputType } from "@/components/screens/admin/validation/adminSchema";

const productService = {
    addProduct : async(data : productInputType)=>{
        const response = await api.post(`${ApiUrl}/product/create` , data);
        console.log(response)
        return response?.data
    },
    getAllProduct: async () => {
        const response = await api.get(`${ApiUrl}/product/get`)
        return response?.data?.data
    },
    getProductById: async (id: string) => {
        // console.log("id", id)
        const response = await api.get(`${ApiUrl}/product/get/${id}`)
        // console.log("hiii")
        // console.log("respo", response)
        return response?.data
    },
    addToWishlist: async (productId: string) => {
        try {
            const token = localStorage.getItem("token"); // ✅ login ke baad save kiya hua token nikaalo

            if (!token) {
                throw new Error("Please login to add items to wishlist");
            }

            const response = await api.post(
                `${ApiUrl}/product/addToWishlist`,
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ token bhejna zaroori hai
                    },
                }
            );
            toast.success(response.data.message)

            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new Error("Please login to add items to wishlist");
            }
            throw new Error(error.response?.data?.message || "Failed to add to wishlist");
        }
    },
    getWishList: async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
              return  toast.error("Please login to get wishlist items");
            }
            const response = await api.get(`${ApiUrl}/product/getWishlistProduct`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

            return response?.data
        } catch (error: any) {
            throw new Error(error.message)
        }
    },
    removeFromWishlist: async (productId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.message("First login to remove item from wishlist");
            }

            const response = api.delete(`${ApiUrl}/product/removeFromWishlist`, {
                data: {productId},
                headers: {
                    Authorization: (`bearer ${token}`)
                }
            })

            toast.success((await response).data.message);
            return response

        } catch (error: any) {
            toast.error(error.message)
        }
    }


}

export default productService;