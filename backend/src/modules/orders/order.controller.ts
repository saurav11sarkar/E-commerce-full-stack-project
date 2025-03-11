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

const getEmail = catchAsycn(async (req, res) => {
  const result = await orderService.getEmail(req.params.email);
  sendResponse(res, 200, "Get this email Order", result);
});

const getOrderById = catchAsycn(async (req, res) => {
  const result = await orderService.getOrderById(req.params.id);
  sendResponse(res, 200, "Get the order", result);
});

const getAllOrders = catchAsycn(async (req, res) => {
  const result = await orderService.getAllOrders();
  sendResponse(res, 200, "Get all order", result);
});

const updatedOrder = catchAsycn(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await orderService.updatedOrder(id, status);
  sendResponse(res, 200, "Updated status is successfuly", result);
});

const deletedOrder = catchAsycn(async (req, res) => {
  const result = await orderService.deletedOrder(req.params.id);
  sendResponse(res, 200, "order is deleted is successfully", result);
});

export const orderController = {
  createChackOut,
  confirmPayment,
  getEmail,
  getOrderById,
  getAllOrders,
  updatedOrder,
  deletedOrder,
};
