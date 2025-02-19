import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only admins can access this route
router.get("/dashboard", protect, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  res.json({ message: "Welcome to the Admin Dashboard" });
});

export default router;
