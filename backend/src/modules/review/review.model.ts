import mongoose from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new mongoose.Schema<IReview>(
  {
    comment: { type: String, required: [true, "comment is requried"] },
    rating: { type: Number, required: [true, "Rating is requried"] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user id is requried"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product id is requried"],
    },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>("Review", reviewSchema);
export default Review;
