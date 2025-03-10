import catchAsycn from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendresponse";
import { orderService } from "./order.service";

const createChackOut = catchAsycn(async (req, res) => {
  const { products } = req.body;
  const result = await orderService.createCheckout(products);
  sendResponse(res, 200, "Order created successfully", result);
});

const confirmPayment = catchAsycn(async (req, res) => {
  const { session_id } = req.body;
  if (!session_id || typeof session_id !== "string") {
    throw new Error("Invalid session ID");
  }
  const result = await orderService.confirmPayment(session_id);
  sendResponse(res, 200, "Order payment confirmed successfully", result);
});

export const orderController = {
  createChackOut,
  confirmPayment,
};
