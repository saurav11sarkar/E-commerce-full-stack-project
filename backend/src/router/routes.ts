import express from "express";
import { useRouter } from "../modules/user/user.routes";
import { productRouter } from "../modules/product/product.routes";
import { reviewsRouter } from "../modules/review/review.routes";
const router = express.Router();

router.use("/auth", useRouter);
router.use("/products", productRouter);
router.use("/reviews", reviewsRouter);

export default router;
