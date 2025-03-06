import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  ENV: process.env.NODE_ENV,
  ROUND: process.env.SALT_ROUND,
  SECRET: process.env.JWT_SECRET,
};
