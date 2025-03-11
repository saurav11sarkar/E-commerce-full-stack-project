import Order from "../orders/order.model";
import Product from "../product/product.model";
import Review from "../review/review.model";
import User from "../user/user.model";

const userStats = async (email: string) => {
  if (!email) throw new Error("Email is required");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User is not found");

  //   sum of all order
  const totalPaymentResult = await Order.aggregate([
    { $match: { email: email } },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
  ]);

  const totalPaymentsAmounts =
    totalPaymentResult.length > 0 ? totalPaymentResult[0].totalAmount : 0;
  //   get total reviews
  const totalReviews = await Review.countDocuments({ userId: user._id });
  //   totalParcess products
  const purchasedProductIds = await Order.distinct("products.productId", {
    email: email,
  });
  const totalPurchasedProducts = purchasedProductIds.length;

  return {
    totalPayments: totalPaymentsAmounts.toFixed(2),
    totalReviews,
    totalPurchasedProducts,
  };
};

const adminStats = async () => {
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalReviews = await Review.countDocuments();
  const totalUsers = await User.countDocuments();

  //   calculated total earning
  const totalEarningResult = await Order.aggregate([
    { $group: { _id: null, totalEarning: { $sum: "$amount" } } },
  ]);

  const totalEarning =
    totalEarningResult.length > 0 ? totalEarningResult[0].totalEarning : 0;

  const monthlyEarningResults = await Order.aggregate([
    {
      $group: {
        _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
        monthlyEarnings: { $sum: "$amount" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  const monthlyEarnings = monthlyEarningResults.map((entry) => ({
    month: entry._id.month,
    year: entry._id.year,
    earnings: entry.monthlyEarnings.toFixed(2),
  }));

  return {
    totalOrders,
    totalProducts,
    totalReviews,
    totalUsers,
    totalEarning,
    monthlyEarnings,
  };
};

export const statsService = {
  userStats,
  adminStats,
};
