import express from "express";
import { useRouter } from "../modules/user/user.routes";
import { productRouter } from "../modules/product/product.routes";
import { reviewsRouter } from "../modules/review/review.routes";
import { orderRouter } from "../modules/orders/order.routes";
import { statsRouter } from "../modules/stats/stats.routes";
const router = express.Router();

router.use("/auth", useRouter);
router.use("/products", productRouter);
router.use("/reviews", reviewsRouter);
router.use("/orders", orderRouter);
router.use("/stats", statsRouter);

export default router;
