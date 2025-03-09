import catchAsycn from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendresponse";
import { orderService } from "./order.service";

const createChackOut = catchAsycn(async (req, res) => {
  const result = await orderService.createCheckout(req.body);
  sendResponse(res, 200, "create order successfully", result);
});

const confirmPayment = catchAsycn(async (req, res) => {
  const result = await orderService.confirmPayment(req.body);
  sendResponse(res, 200, "Order paymeny confirm successfully", result);
});

export const orderController = {
  createChackOut,
  confirmPayment,
};
