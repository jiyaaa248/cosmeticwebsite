import express from "express";
import Contact from "../models/Contact.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ── POST /api/contact  — submit message (public) ── */
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message)
      return res.status(400).json({ message: "All fields are required" });

    await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: "Message sent successfully! We'll reply soon 💖" });
  } catch (err) {
    console.error("Contact error:", err.message);
    res.status(500).json({ message: "Server error. Try again." });
  }
});

/* ── GET /api/contact  — view all messages (admin only) ── */
router.get("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
