import express from "express";
import { productController } from "./product.controller";
import auth from "../../middlewares/Auth";
const router = express.Router();

router.post("/create-product", productController.createProduct);
router.get("/", productController.getAllproduct);
router.get("/:id", productController.singleProduct);
router.patch(
  "/update-product/:id",
  auth("admin"),
  productController.updateProduct
);
router.delete("/:id", auth("admin"), productController.deletedProduct);

// get releted Products
router.get("/related/:id", productController.reletedProduct);

export const productRouter = router;
