import config from "../../config";
import { IOrder } from "./order.interface";

import stripe from "stripe";
import Order from "./order.model";
import { Types } from "mongoose";
const stripeInstance = new stripe(config.STRIPE_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

const createCheckout = async (payload: IOrder): Promise<{ id: string }> => {
  const lineItems = payload.products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:5173/cancel`,
  });

  return { id: session.id };
};

const confirmPayment = async (sessionId: string) => {
  const session = await stripeInstance.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntentId = session.payment_intent?.toString();
  if (!paymentIntentId) throw new Error("Invalid payment session");

  let order = await Order.findOne({ orderId: paymentIntentId });
  if (!order) {
    const lineItems = session.line_items?.data.map((item) => ({
      productId: new Types.ObjectId(item.price?.product?.toString() || ""),
      quantity: item.quantity ?? 1,
    }));
    const amount = (session.amount_total ?? 0) / 100;
    order = new Order({
      orderId: paymentIntentId,
      amount,
      products: lineItems,
      email: session.customer_details?.email ?? "",
      status: session.payment_status === "paid" ? "pending" : "failed",
    });
  } else {
    order.status = session.payment_status === "paid" ? "pending" : "failed";
  }
  await order.save();
  return order;
};

export const orderService = { createCheckout, confirmPayment };