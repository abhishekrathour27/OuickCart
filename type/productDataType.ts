// Abhi aisa hai
export interface ProductType {
  _id: string;
  name: string;
  price: number;
  offerPrice : number;
  description: string;
  category: string;
  image?: string;
}

export interface CartItemResponseType {
    productId: ProductID;
    offerPrice : number
    quantity:  number;
    _id:       string;
}

export interface ProductID {
    _id:             string;
    name:            string;
    description:     string;
    price:           number;
    offerPrice:      number;
    image:           string[];
    category:        string;
    wishlistProduct: any[];
    date:            number;
    __v:             number;
}
