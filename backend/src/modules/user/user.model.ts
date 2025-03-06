import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "./user.interface";
import config from "../../config";

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      require: [true, "User Name is requried"],
      unique: true,
    },
    email: { type: String, require: [true, "Email is requried"], unique: true },
    password: { type: String, require: [true, "Password is requried"] },
    role: { type: String, default: "user" },
    profileImage: { type: String },
    bio: { type: String, maxlength: 200 },
    profession: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.ROUND));
  next();
});


const User = mongoose.model<IUser>("User", userSchema);
export default User;
