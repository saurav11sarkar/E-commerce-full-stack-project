import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import cookiesParser from "cookie-parser";
import router from "./router/routes";

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
// app.use(cors({ origin: "http://localhost:5173/", credentials: true }));
// app.use(express.urlencoded({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      '<h2 style="text-align: center; color: red;">Server is running 🦞</h2>'
    );
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: "Route is not defiend" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: err.message,
    error: err,
    stack: config.ENV === "development" ? err.stack : {},
  });
});

export default app;
