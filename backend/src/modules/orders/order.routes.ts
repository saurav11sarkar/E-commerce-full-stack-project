import express from "express";
import { orderController } from "./order.controller";
const router = express.Router();

router.post("/create-chackout-session", orderController.createChackOut);
router.post("/confirm-payment", orderController.confirmPayment);

export const orderRouter = router;
