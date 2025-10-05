import axios from "axios"
import { ApiUrl } from "./url.services";
import { SignUpFormData } from "@/components/screens/auth/sign_up/components/validation/SignUpSchema";
import { toast } from "sonner";
import { forgetPasswordFormData } from "@/components/screens/auth/forgetPassword/components/validation/forgetPasswordSchema";
import { resetPasswordFromData } from "@/components/screens/auth/resetPassword/components/validation/resetPasswordSchema";

type loginData = {
    email: string,
    password: string
}

export const login = async (data: loginData) => {
    try {
        const response = await axios.post(`${ApiUrl}/auth/login`, data);
        console.log(response)
        return response.data;
    } catch (error: any) {
        console.error("login service error", {
            message: error?.message,
            response: error?.response?.data,
            status: error?.response?.status,
        })
        throw error;
    }
}

export const signup = async (data: SignUpFormData) => {
    try {
        const response = await axios.post(`${ApiUrl}/auth/register`, data);
        console.log(response)
        return response.data
    } catch (error: any) {
        console.error("signup service error", {
            message: error?.message,
            response: error?.response?.data,
            status: error?.response?.status,
        })
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await axios.post(`${ApiUrl}/auth/logout`);
        return response
    } catch (error) {
        console.error(error)
    }
};


export const forgetPassword = async (data: forgetPasswordFormData) => {
    try {
        const response = await axios.post(`${ApiUrl}/auth/forget-password`, data)
        console.log(response)
        return response.data
    } catch (error: any) {
        console.error("forget password service error", {
            message: error?.message,
            response: error?.response?.data,
            status: error?.response?.status,
        })
        throw error;
    }
}

export const resetPassword = async (token: string, data: resetPasswordFromData) => {
    try {
        const response = await axios.post(`${ApiUrl}/auth/reset-password/${token}`, data);
        return response.data;
    } catch (error: any) {
        console.error("reset password service error", {
            message: error?.message,
            response: error?.response?.data,
            status: error?.response?.status,
        });
        throw error;
    }
};



export const profile = async () => {
    const token = localStorage.getItem("token")
    try {
        if (token) {
            const response = await axios.get(`${ApiUrl}/auth/profile`, {
                headers: {
                    Authorization: `Bearar ${token}`
                }
            })
            return await response.data
        }
    } catch (error: any) {
        console.error("profile service error", {
            message: error?.message,
            response: error?.response?.data,
            status: error?.response?.status,
        })
        throw error;
    }
}
