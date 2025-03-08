import Product from "../product/product.model";
import { IReview } from "./review.interface";
import Review from "./review.model";

const createReview = async (payload: IReview) => {
  const { comment, rating, productId, userId } = payload;
  if (!comment || !rating || !productId || !userId) {
    throw new Error("All fields are required");
  }
  const existingReview = await Review.findOne({ productId, userId });
  if (existingReview) {
    // updeted review
    existingReview.comment = comment;
    existingReview.rating = rating;
    existingReview.save();
  } else {
    // create new review
    Review.create(payload);
  }

  //   calculate average rating
  const reviews = await Review.find({ productId });
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    const product = await Product.findById(productId);
    if (product) {
      product.rating = averageRating;
      await product.save({ validateBeforeSave: false });
    } else {
      return new Error("Product not found");
    }
  }
  return reviews;
};

const totalReview = async () => {
  const totalReview = await Review.countDocuments({});
  return totalReview;
};

const getReviewByUser = async (id: string) => {
  if (!id) {
    throw new Error("User id is required");
  }
  const reviews = await Review.find({ userId: id }).sort({ createdAt: -1 });
  if (reviews.length === 0) {
    throw new Error("Review not found");
  }
  return reviews;
};

export const reviewsService = {
  createReview,
  totalReview,
  getReviewByUser,
};
