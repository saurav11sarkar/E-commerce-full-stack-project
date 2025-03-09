import { Types } from "mongoose";

interface IProduct {
  productId: Types.ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  orderId?: string;
  products: IProduct[];
  amount?: number;
  email: string;
  status: "pending" | "processing" | "shipped" | "completed" | "failed";
}