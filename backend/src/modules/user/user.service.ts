import config from "../../config";
import { IEditProfile, ILogin, IUser } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (payload: Partial<IUser>) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw new Error("User is not found");

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) throw new Error("Password is not match");

  const { _id, username, email, role } = user;
  const token = jwt.sign(
    { _id, username, email, role },
    config.SECRET as string,
    { expiresIn: "1d" }
  );

  const { password: _, ...data } = user.toObject();

  return {
    // token: `Bearer ${token}`,
    token,
    data,
  };

};

const getUser = async () => {
  const result = await User.find()
    .select("id email role")
    .sort({ createdAt: -1 });
  return result;
};

const deletedUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  if (!result) throw new Error("User is not found");
  return result;
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.ROUND)
    );
  }
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new Error("User is not update");
  }
  return result;
};

const editProfile = async (payload: Partial<IEditProfile>) => {
  if (!payload.userId) throw new Error("User id is requried");
  const user = await User.findById(payload.userId);
  if (!user) throw new Error("User is not match");

  if (payload.username !== undefined) user.username = payload.username;
  if (payload.profileImage !== undefined)
    user.profileImage = payload.profileImage;
  if (payload.bio !== undefined) user.bio = payload.bio;
  if (payload.profession !== undefined) user.profession = payload.profession;
  await user.save();

  return user;
};

export const UserService = {
  registerUser,
  getUser,
  loginUser,
  deletedUser,
  updateUser,
  editProfile,
};
