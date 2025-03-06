import catchAsycn from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendresponse";
import { UserService } from "./user.service";

const registerUser = catchAsycn(async (req, res) => {
  const result = await UserService.registerUser(req.body);
  sendResponse(res, 201, "User create Successfully", result);
});

const loginUser = catchAsycn(async (req, res) => {
  const result = await UserService.loginUser(req.body);
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  sendResponse(res, 200, "User login Successfully", result.data);
});

const logOutUser = catchAsycn(async (req, res) => {
  res.clearCookie("token");
  sendResponse(res, 200, "User logOut successfully", null);
});

const getUser = catchAsycn(async (req, res) => {
  const result = await UserService.getUser();
  sendResponse(res, 200, "All user", result);
});
const deletedUser = catchAsycn(async (req, res) => {
  const result = await UserService.deletedUser(req.params.id);
  sendResponse(res, 200, "user deleted successfully", result);
});

const updateUser = catchAsycn(async (req, res) => {
  const result = await UserService.updateUser(req.params.id, req.body);
  sendResponse(res, 200, "User Role update successfully", result);
});
const editProfile = catchAsycn(async (req, res) => {
  const result = await UserService.editProfile( req.body);
  sendResponse(res, 200, "User updated successfully", result);
});

export const userController = {
  registerUser,
  getUser,
  loginUser,
  logOutUser,
  deletedUser,
  updateUser,
  editProfile
};
