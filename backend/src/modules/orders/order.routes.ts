import express from "express";
import { orderController } from "./order.controller";
const router = express.Router();

router.post("/create-chackout-session", orderController.createChackOut);
router.post("/confirm-payment", orderController.confirmPayment);
// get order by email address
router.get("/:email", orderController.getEmail);
// get order by id

export const orderRouter = router;
