import { Types } from "mongoose";

export interface IReview {
  comment: string;
  rating: number;
  userId:Types.ObjectId;
  productId:Types.ObjectId;
}
