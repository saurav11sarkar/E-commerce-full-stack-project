import express from "express";
import { reviewsController } from "./review.controller";
const router = express.Router();

// post a new review
router.post("/post-review", reviewsController.createReview);
// total review count
router.get("/total-review", reviewsController.totalReview);
// get review by user
router.get("/:userId", reviewsController.getReviewByUser)

export const reviewsRouter = router;
