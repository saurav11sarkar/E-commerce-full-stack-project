import express from "express";
import { productController } from "./product.controller";
const router = express.Router();

router.post("/create-product", productController.createProduct);
router.get("/", productController.getAllproduct);
router.get("/:id", productController.singleProduct);
router.patch("/update-product/:id", productController.updateProduct);

export const productRouter = router;
