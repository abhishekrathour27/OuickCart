import * as yup from "yup";

export const addressSchema = yup.object({
  name: yup.string().required(),
  phoneNo: yup.number().required(),
  street: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  pincode: yup.string().required(),
  landmark: yup.string(), // this means required (nullable ≠ optional)
});

export type AddressTypeData = yup.InferType<typeof addressSchema>