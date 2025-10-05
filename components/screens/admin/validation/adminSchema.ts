import * as yup from "yup"

export const productInputSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required().min(10),
    category: yup.string().required(),
    price: yup.number().required(),
    offerPrice : yup.number().required(),
})

export type productInputType = yup.InferType<typeof productInputSchema>