import express from "express";
import { orderController } from "./order.controller";
const router = express.Router();

router.post("/create-chackout-session", orderController.createChackOut);
router.post("/confirm-payment", orderController.confirmPayment);

router.get("/:email", orderController.getEmail);
router.get("/order/:id", orderController.getOrderById);
// auth("admin"),
router.get("/", orderController.getAllOrders);
router.patch("/update-order-status/:id", orderController.updatedOrder);
router.delete("/order-order/:id", orderController.deletedOrder);

export const orderRouter = router;
