import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    orderId: { type: String },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    amount: Number,
    email: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);
export default Order;
