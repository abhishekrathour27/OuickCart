"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import CustomBtn from "@/components/custom/CustomBtn";
import {
  resetPasswordFromData,
  resetPasswordSchema,
} from "./validation/resetPasswordSchema";
import { resetPassword } from "@/services/authServices";
import { useParams } from "next/navigation";

const ResetPasswordPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordFromData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const { token } = useParams();

  const onSubmit = async (data: resetPasswordFromData) => {
    try {
      if (!token) {
        toast.error("Invalid reset link");
        return;
      }
      const response = await resetPassword( token as string , data); // ✅ token first argument
      console.log(response);
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <label className="block font-medium">New Password</label>
            <input
              type={showPass ? "text" : "password"}
              {...register("newpassword")}
              placeholder="Enter new password"
              className="w-full border px-3 py-2 rounded-lg outline-none"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <Eye /> : <EyeClosed />}
            </div>
            {errors.newpassword && (
              <p className="text-red-500 text-sm">
                {errors.newpassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block font-medium">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmpassword")}
              placeholder="Confirm new password"
              className="w-full border px-3 py-2 rounded-lg outline-none"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <Eye /> : <EyeClosed />}
            </div>
            {errors.confirmpassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmpassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <CustomBtn className="w-full rounded-lg mt-2">
            Reset Password
          </CustomBtn>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
