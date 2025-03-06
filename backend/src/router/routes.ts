import express from "express";
import { useRouter } from "../modules/user/user.routes";
import { productRouter } from "../modules/product/product.routes";
const router = express.Router();

router.use("/auth", useRouter);
router.use("/products", productRouter);

export default router;
