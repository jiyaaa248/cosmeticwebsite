import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";   // ← NEW

dotenv.config();
connectDB();

const app = express();

/* ── Middleware ── */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

/* ── API Routes ── */
app.use("/api/auth",     authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact",  contactRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/cart",     cartRoutes);   // ← NEW

/* ── Health Check ── */
app.get("/api/health", (req, res) => {
  res.json({ message: "Glamora Server is running ✅" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Glamora Server running on http://localhost:${PORT}`)
);