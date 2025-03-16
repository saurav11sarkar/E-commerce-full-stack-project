import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  ENV: process.env.NODE_ENV,
  ROUND: process.env.SALT_ROUND,
  SECRET: process.env.JWT_SECRET,
  STRIPE_KEY: process.env.STRIPE_KEY,
  CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME
};
