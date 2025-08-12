import CustomBtn from "@/components/custom/CustomBtn";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "./validation/loginSchema";

const LoginFrom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver : yupResolver(loginSchema)
  });

  const submit = (data : LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="my-5">
      <div className="space-y-2 my-5">
        <center className="font-semibold text-3xl">Login to OuickCart</center>
        <center className="">Welcome back! Please login to continue </center>
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
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="border px-3 py-2 border-black outline-none rounded-lg"
            />
          </div>
          <CustomBtn className="w-full rounded-lg mt-2">Login</CustomBtn>
        </div>
      </form>
    </div>
  );
};

export default LoginFrom;
