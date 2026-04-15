import express from "express";
import Feedback from "../models/Feedback.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ── POST /api/feedback  — submit feedback (public) ── */
router.post("/", async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!name || !email || !rating || !message)
      return res.status(400).json({ message: "All fields are required" });

    if (rating < 1 || rating > 5)
      return res.status(400).json({ message: "Rating must be between 1 and 5" });

    await Feedback.create({ name, email, rating, message });
    res.status(201).json({ message: "Thank you for your feedback! 🌸" });
  } catch (err) {
    console.error("Feedback error:", err.message);
    res.status(500).json({ message: "Server error. Try again." });
  }
});

/* ── GET /api/feedback  — view all feedback (admin only) ── */
router.get("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
