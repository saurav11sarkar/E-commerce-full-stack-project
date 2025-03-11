import catchAsycn from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendresponse";
import { statsService } from "./stats.service";

const userStats = catchAsycn(async (req, res) => {
  const { email } = req.params;
  const result = await statsService.userStats(email);
  sendResponse(res, 200, "User stats", result);
});

const adminStats = catchAsycn(async (req, res) => {
  const result = await statsService.adminStats();
  sendResponse(res, 200, "Admin stats", result);
});

export const statsController = {
  userStats,
  adminStats,
};
