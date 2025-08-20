import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addressSchema, addressTypeData } from "./validation/addressSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import CustomBtn from "@/components/custom/CustomBtn";
import { toast } from "sonner";
import { useModal } from "@/context/modalContext";
import { useCart } from "@/context/cartContext";

type ChildFormProps = {
  setAddress: React.Dispatch<React.SetStateAction<addressTypeData[]>>;
};

const Address = ({ setAddress }: ChildFormProps) => {
  const { closeModal } = useModal();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<addressTypeData>({
    resolver: yupResolver(addressSchema),
  });

  const submit = (data: addressTypeData) => {
    console.log("hello world", data);
    try {
      if (data) {
        console.log("first");
        setAddress((prev) => [...prev, data]);
        toast.success("Address added");
        closeModal();
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <center className="text-2xl font-semibold mb-3">
          Add Shipping <span className="text-orange-500">Address</span>
        </center>
        <div className="space-y-3">
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
            id="address"
            className="border rounded-lg p-1"
            rows={4}
            cols={61}
            placeholder="Address(area/street)"
            {...register("address")}
          ></textarea>
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
          <div className="flex gap-2">
            <Input type="text" placeholder="City/Town" {...register("city")} />
            <Input type="text" placeholder="State" {...register("state")} />
          </div>
          <CustomBtn className="text-white w-full">SAVE ADDRESS</CustomBtn>
        </div>
      </form>
    </div>
  );
};

export default Address;
