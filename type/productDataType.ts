export interface ProductType {
  _id: string;
  userId: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  image: string[]; // multiple images
  category: string;
  date: number; // timestamp (ms)
  __v: number;
}
