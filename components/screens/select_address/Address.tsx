"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import CustomBtn from "@/components/custom/CustomBtn";
import { toast } from "sonner";
import { useModal } from "@/context/modalContext";
import { AddressType, useAddress } from "@/context/addressContext";
import { addressSchema } from "./validation/addressSchema";
import { addressServices } from "@/services/addressServices";

type AddressPropsType = {
  mode: "create" | "edit";
  data?: AddressType;
};

const Address = ({ mode, data }: AddressPropsType) => {
  const { closeModal } = useModal();
  const { setAddresses, updateAddress } = useAddress();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressType>({
    defaultValues: {
      name: mode === "edit" ? data?.name : "",
      phoneNo: mode === "edit" ? data?.phoneNo : "",
      street: mode === "edit" ? data?.street : "",
      city: mode === "edit" ? data?.city : "",
      state: mode === "edit" ? data?.state : "",
      pincode: mode === "edit" ? data?.pincode : "",
      landmark: mode === "edit" ? data?.landmark : "",
    },
    resolver: yupResolver(addressSchema) as any, // ✅ fixed
  });

  const submit = async (payload: AddressType) => {
    try {
      if (mode === "create") {
        const response = await addressServices.createAddress(payload);
        setAddresses((prev) => [...prev, response?.data]);
      } else {
        const response = await addressServices.updateAddress(
          data?._id as string,
          payload
        );
        setAddresses((prev) =>
          prev.map((item) =>
            item._id === response?.data?.data?._id ? response?.data?.data : item
          )
        );
        console.log("resss", response);
      }
      closeModal();
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address!");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(submit)} className="space-y-3">
        <center className="text-2xl font-semibold mb-3">
          {mode === "create" ? "Add" : "Edit"} Shipping{" "}
          <span className="text-orange-500">Address</span>
        </center>

        <Input type="text" placeholder="Full name" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <Input
          type="text"
          placeholder="Phone number"
          {...register("phoneNo")}
        />
        {errors.phoneNo && (
          <p className="text-red-500">{errors.phoneNo.message}</p>
        )}

        <Input type="text" placeholder="Pincode" {...register("pincode")} />
        {errors.pincode && (
          <p className="text-red-500">{errors.pincode.message}</p>
        )}

        <textarea
          className="border rounded-lg p-2 w-full"
          rows={3}
          placeholder="Street / Area / House No."
          {...register("street")}
        ></textarea>
        {errors.street && (
          <p className="text-red-500">{errors.street.message}</p>
        )}

        <div className="flex gap-2">
          <Input type="text" placeholder="City / Town" {...register("city")} />
          <Input type="text" placeholder="State" {...register("state")} />
        </div>
        {(errors.city || errors.state) && (
          <p className="text-red-500">
            {errors.city?.message || errors.state?.message}
          </p>
        )}

        <Input
          type="text"
          placeholder="Landmark (optional)"
          {...register("landmark")}
        />

        <CustomBtn type="submit" className="text-white w-full">
          SAVE ADDRESS
        </CustomBtn>
      </form>
    </div>
  );
};

export default Address;
