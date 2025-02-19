import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

export default router;
