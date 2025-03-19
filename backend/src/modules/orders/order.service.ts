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
      "https://ecommerce-fortend.vercel.app/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://ecommerce-fortend.vercel.app/cancel",
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

const getEmail = async (email: string) => {
  if (!email) throw new Error("Email is requried");
  const order = await Order.find({ email });
  if (order.length === 0 && !order) throw new Error("No order in this email");
  return order;
};

const getOrderById = async (id: string) => {
  const order = await Order.findById(id);
  if (!order) throw new Error("Id is not found");
  return order;
};

const getAllOrders = async () => {
  const result = await Order.find().sort({ createdAt: -1 });
  if (result.length === 0) throw new Error("No order found");
  return result;
};

const updatedOrder = async (id: string, status: string) => {
  if (!status) throw new Error("Status is requried");
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status, updatedAt: new Date() },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedOrder) throw new Error("Order is not updeted");
  return updatedOrder;
};

const deletedOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  if (!result) throw new Error("Order is not found");
  return result;
};

export const orderService = {
  createCheckout,
  confirmPayment,
  getEmail,
  getOrderById,
  getAllOrders,
  updatedOrder,
  deletedOrder,
};
