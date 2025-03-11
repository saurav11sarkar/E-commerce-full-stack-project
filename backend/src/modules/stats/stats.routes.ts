import express from "express";
import { statsController } from "./stats.controller";
const router = express.Router();

// user stats by email
router.get("/user-stats/:email", statsController.userStats);
router.get("/admin-stats", statsController.adminStats);

export const statsRouter = router;
