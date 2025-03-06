import { Types } from "mongoose";

export interface IProduct {
  name: string;
  category: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  color: string;
  rating: number;
  author: Types.ObjectId;
}
