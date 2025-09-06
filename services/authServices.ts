import axios from "axios"
import { ApiUrl } from "./url.services";
import { SignUpFormData } from "@/components/screens/auth/sign_up/components/validation/SignUpSchema";

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
        console.error("login service error", {
            message: error?.message,
            response: error?.response?.data,
            status: error?.response?.status,
        })
        throw error;
    }
}

export const forgetPassword = async (email: { email: string }) => {
    try {
        const response = await axios.post(`${ApiUrl}/auth/forgetPassword`, email)
        console.log(response)
        return response
    } catch (error: any) {
        console.error("login service error", {
            message: error?.message,
            response: error?.response?.data,
            status: error?.response?.status,
        })
        throw error;
    }
}


export const profile = async () => {
    const token = localStorage.getItem("token")
    try {
        const response = await axios.get(`${ApiUrl}/auth/profile`, {
            headers: {
                Authorization: `Bearar ${token}`
            }
        })
        return await response.data
    } catch (error: any) {
        console.error("login service error", {
            message: error?.message,
            response: error?.response?.data,
            status: error?.response?.status,
        })
        throw error;
    }
}
