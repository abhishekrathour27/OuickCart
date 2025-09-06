"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpFormData, SignUpSchema } from "./validation/SignUpSchema";
import CustomBtn from "@/components/custom/CustomBtn";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "@/services/authServices";

type Props = {
  switchToLogin: () => void;
};

const SignUpForm = ({ switchToLogin }: Props) => {
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(SignUpSchema),
  });

  const submit = async (data: SignUpFormData) => {
    try {
      const signupData = await signup(data);
      if (signupData?.data.status === "success") {
        switchToLogin();
        toast.success("signup successfully");
      }
    } catch (error) {
      toast.error("signup failed");
    }
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="space-y-2">
        <div className="space-y-2 my-5">
          <center className="font-semibold text-3xl">
            Sign up to QuickCart
          </center>
          <center>Welcome! Please fill in the details to get started</center>
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name")}
            className="border px-3 py-2 border-black outline-none rounded-lg"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
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

        {/* Password */}
        <div className="flex flex-col relative">
          <label className="text-lg font-semibold">Password</label>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className="border px-3 py-2 border-black outline-none rounded-lg"
          />
          <div
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <Eye /> : <EyeClosed />}
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <CustomBtn className="w-full rounded-lg mt-2">Sign up</CustomBtn>
      </div>

      <center className="mt-4">
        Already have an account?{" "}
        <span
          onClick={switchToLogin}
          className="text-orange-500 cursor-pointer"
        >
          Login
        </span>
      </center>
    </form>
  );
};

export default SignUpForm;
