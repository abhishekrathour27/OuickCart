import * as yup from "yup";

export const addressSchema = yup.object({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
    
  phoneNo: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),

  address: yup
    .string()
    .required("Address is required"),

  city: yup
    .string()
    .required("City is required"),

  state: yup
    .string()
    .required("State is required"),
});

export type addressTypeData = yup.InferType<typeof addressSchema>;
