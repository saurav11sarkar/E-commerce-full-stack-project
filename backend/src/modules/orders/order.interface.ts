export interface IProductOrder {
  productId: string;
  name?: string;
  image?: string;
  price?: number;
  quantity: number;
}


export interface IOrder {
  orderId?: string;
  products: IProductOrder[];
  amount?: number;
  email: string;
  status: "pending" | "processing" | "shipped" | "completed" | "failed";
}