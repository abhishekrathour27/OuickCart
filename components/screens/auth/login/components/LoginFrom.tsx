"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "./validation/loginSchema";
import CustomBtn from "@/components/custom/CustomBtn";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";

type Props = {
  switchToSignUp: () => void;
};

const LoginFrom = ({ switchToSignUp }: Props) => {
  const [showPass, setShowPass] = useState(false);

  const localStorageData = localStorage.getItem("signUp");

  if (localStorageData) {
    const signUpdata = JSON.parse(localStorageData);
  } else {
    console.log("Data not found");
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const submit = (data: LoginFormData) => {
    const localStorageData = localStorage.getItem("signUp");

    if (!localStorageData) {
      toast.error("Data not found");
      return;
    }
    const signUpdata = JSON.parse(localStorageData);
    if (
      data.email === signUpdata.email &&
      data.password === signUpdata.password
    ) {
      localStorage.setItem('login' , JSON.stringify(data))
      toast.success("Log in successfully");
      reset();
    }
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
    </div>
  );
};

export default LoginFrom;
