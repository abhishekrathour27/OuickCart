import api from "@/lib/api"
import { ApiUrl } from "./url.services"
import { toast } from "sonner";

const cartServices = {
    addToCart: async (productId: string) => {

        const token = localStorage.getItem("token")
        if (!token) {
            return toast.error("Please login to get wishlist items");
        }

        const response = await api.post(`${ApiUrl}/cart/addtocart`,
            { productId },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response?.data;
    },
    getCartData: async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            return toast.error("Please login to get wishlist items");
        }

        const response = await api.get(`${ApiUrl}/cart/get`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        return response?.data
    },
    decreaseFromCart: (productId: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return toast.error("Please login to manage cart items");
        }

        const response = api.post(`${ApiUrl}/cart/decrease`, { productId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success("item removed from cart")
        return response;
    },
    removeCartData: async (productId: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return toast.error("Please login to manage cart items");
        }

        const response = await api.delete(`${ApiUrl}/cart/remove`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { productId },
        });

        return response;

    }
}

export default cartServices;