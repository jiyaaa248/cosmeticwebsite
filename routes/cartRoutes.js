import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ── GET /api/cart  — get logged-in user's cart ── */
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart ? cart.items : []);
  } catch (err) {
    console.error("GET cart error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

/* ── POST /api/cart  — add item to cart ── */
router.post("/", protect, async (req, res) => {
  try {
    const { productId, name, price, image, category, quantity = 1 } = req.body;

    if (!productId || !name || !price)
      return res.status(400).json({ message: "productId, name and price are required" });

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    // productId stored as string — compare as strings
    const existing = cart.items.find((i) => i.productId === String(productId));
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        productId: String(productId),
        name,
        price,
        image,
        category,
        quantity,
      });
    }

    await cart.save();
    res.json(cart.items);
  } catch (err) {
    console.error("POST cart error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

/* ── PUT /api/cart/:productId  — update quantity ── */
router.put("/:productId", protect, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.productId === req.params.productId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId !== req.params.productId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.json(cart.items);
  } catch (err) {
    console.error("PUT cart error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

/* ── DELETE /api/cart  — clear entire cart (MUST be before /:productId) ── */
router.delete("/", protect, async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });
    res.json([]);
  } catch (err) {
    console.error("CLEAR cart error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

/* ── DELETE /api/cart/:productId  — remove single item ── */
router.delete("/:productId", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.productId !== req.params.productId);
    await cart.save();
    res.json(cart.items);
  } catch (err) {
    console.error("DELETE cart item error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

export default router;