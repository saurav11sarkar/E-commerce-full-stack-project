import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const port = config.PORT;

const server = async () => {
  try {
    await mongoose.connect(config.DB_URL as string);
    app.listen(port, () => {
      console.log(`server is running http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

server();
