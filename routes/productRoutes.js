import express from "express";
import Product from "../models/Product.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ── GET /api/products  — get all products (public) ── */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query; // ?category=makeup
    const filter = category ? { category } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ── GET /api/products/:id  — single product (public) ── */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ── POST /api/products  — add product (admin only) ── */
router.post("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const { name, price, category, description, image, stock } = req.body;
    if (!name || !price || !category || !description || !image)
      return res.status(400).json({ message: "All fields are required" });

    const product = await Product.create({ name, price, category, description, image, stock });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ── PUT /api/products/:id  — update product (admin only) ── */
router.put("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ── DELETE /api/products/:id  — delete product (admin only) ── */
router.delete("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
