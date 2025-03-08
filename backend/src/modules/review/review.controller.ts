import catchAsycn from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendresponse";
import { reviewsService } from "./review.service";

const createReview = catchAsycn(async (req, res) => {
  const result = await reviewsService.createReview(req.body);
  sendResponse(res, 201, "Review created successfully", result);
});

const totalReview = catchAsycn(async (req, res) => {
  const result = await reviewsService.totalReview();
  sendResponse(res, 200, "Total review", result);
});

const getReviewByUser = catchAsycn(async (req, res) => {
  const result = await reviewsService.getReviewByUser(req.params.userId);
  sendResponse(res, 200, "Review by user", result);
});

export const reviewsController = {
  createReview,
  totalReview,
  getReviewByUser
};
