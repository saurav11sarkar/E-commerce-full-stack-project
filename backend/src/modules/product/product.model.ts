import mongoose from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: [true, "Name is requried"] },
    category: { type: String },
    description: { type: String },
    price: { type: Number, required: [true, "Price is requried"] },
    oldPrice: { type: Number },
    image: { type: String },
    color: { type: String },
    rating: { type: Number, default: 0 },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
