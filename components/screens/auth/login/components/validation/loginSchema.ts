import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required('Email feild is required'),
  password: yup.string().min(4).max(20).required('Password must be required'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
