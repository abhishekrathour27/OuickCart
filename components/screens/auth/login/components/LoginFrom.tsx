"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "./validation/loginSchema";
import CustomBtn from "@/components/custom/CustomBtn";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { useModal } from "@/context/modalContext";
import { login } from "@/services/authServices";
import { useRouter } from "nextjs-toploader/app";

type Props = {
  switchToSignUp: () => void;
};

const LoginFrom = ({ switchToSignUp }: Props) => {
  const [showPass, setShowPass] = useState(false);
  const { closeModal } = useModal();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const submit = async (data: LoginFormData) => {
    try {
      const loginData = await login(data);
      if (loginData.status === "success") {
        localStorage.setItem("token", loginData.data.accessToken);
        closeModal();
        toast.success(loginData?.message);
      }
      if(loginData?.data?.role === "admin"){
        // router.push("/admin")
        localStorage.setItem("role" , "admin")
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const handleForgetPassword = () => {
    const email = getValues("email");

    if (!email) {
      toast.error("Please enter your email first");
      return;
    }
    router.push("/forget-password");
    closeModal()
  };

  return (
    <div className="my-5">
      <div className="space-y-2 my-5">
        <center className="font-semibold text-3xl">Login to OuickCart</center>
        <center>Welcome back! Please login to continue</center>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <div className="space-y-2">
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="border px-3 py-2 border-black outline-none rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col relative">
            <label className="text-lg font-semibold">Password</label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className=" border px-3 py-2 border-black outline-none rounded-lg"
            />
            <div
              className="absolute left-80 top-9 cursor-pointer  "
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <Eye /> : <EyeClosed />}
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <CustomBtn className="w-full rounded-lg mt-2">Login</CustomBtn>
        </div>
      </form>
      <center className="mt-4">
        Don't have an account?{" "}
        <span
          onClick={switchToSignUp}
          className="text-orange-500 cursor-pointer"
        >
          Create one here
        </span>
      </center>
      <center
        onClick={handleForgetPassword}
        className="text-blue-500 cursor-pointer hover:underline hover:underline-offset-auto"
      >
        forget password ?
      </center>
    </div>
  );
};

export default LoginFrom;
