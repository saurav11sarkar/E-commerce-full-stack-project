import config from "../../config";
import stripe from "stripe";
import Order from "./order.model";
import { IOrder, IProductOrder } from "./order.interface";

const stripeInstance = new stripe(config.STRIPE_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

const createCheckout = async (
  products: IProductOrder[]
): Promise<{ id: string }> => {
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name || "Unknown Product",
        images: product.image ? [product.image] : [],
      },
      unit_amount: product.price ? Math.round(product.price * 100) : 0,
    },
    quantity: product.quantity,
  }));

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url:
      "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:5173/cancel",
  });

  if (!session.id) {
    throw new Error("Stripe session creation failed");
  }

  return { id: session.id };
};

const confirmPayment = async (session_id: string): Promise<IOrder> => {
  const session = await stripeInstance.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (!session.payment_intent) {
    throw new Error("Invalid payment session");
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent.id;

  // const paymentIntentId = session.payment_intent?.id;
  // console.log(paymentIntentId);
  let order = await Order.findOne({ orderId: paymentIntentId });

  if (!order) {
    const lineItems =
      session.line_items?.data.map((item) => ({
        productId: item.price?.product?.toString() || "",
        quantity: item.quantity ?? 1,
      })) || [];

    const amount = (session.amount_total ?? 0) / 100;
    order = new Order({
      orderId: paymentIntentId,
      amount,
      products: lineItems,
      email: session.customer_details?.email || "",
      status: session.payment_status === "paid" ? "pending" : "failed",
    });
  } else {
    order.status = session.payment_status === "paid" ? "pending" : "failed";
  }

  await order.save();
  return order;
};

export const orderService = { createCheckout, confirmPayment };

