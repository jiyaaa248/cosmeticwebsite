// Run this once to add products to your database:
// node seedProducts.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Brown Lipstick",
    price: 1200,
    category: "makeup",
    description: "Long-lasting matte lipstick with rich color. Stays on all day without drying your lips.",
    image: "lipstick",
    stock: 50,
  },
  {
    name: "Glow Foundation",
    price: 2500,
    category: "makeup",
    description: "Lightweight foundation for a natural glowing finish. Suitable for all skin types.",
    image: "foundation",
    stock: 40,
  },
  {
    name: "Vitamin C Serum",
    price: 1800,
    category: "skincare",
    description: "Brightens skin, reduces dark spots and improves texture. Apply daily for best results.",
    image: "serum",
    stock: 60,
  },
  {
    name: "Keratin Shampoo",
    price: 1400,
    category: "haircare",
    description: "Strengthens hair, reduces frizz and adds shine. Suitable for all hair types.",
    image: "shampoo",
    stock: 80,
  },
  {
    name: " new lipstick",
    price: 1600,
    category: "makeup",
    description: "4-shade blush palette with rosy pink tones for a natural flushed look.",
    image: "product1",
    stock: 35,
  },
  {
    name: "Hydrating Face Cream",
    price: 2200,
    category: "skincare",
    description: "Deep moisturizing cream with hyaluronic acid. Keeps skin soft and hydrated all day.",
    image: "product2",
    stock: 45,
  },
  {
    name: "Shimmer Eye Shadow",
    price: 980,
    category: "makeup",
    description: "Pigmented shimmer eyeshadow for a glamorous look. Blends easily, long-lasting.",
    image: "product3",
    stock: 55,
  },
  {
    name: "Argan Hair Oil",
    price: 1750,
    category: "haircare",
    description: "Nourishing argan oil treatment for silky smooth hair. Reduces breakage and split ends.",
    image: "shampoo",
    stock: 70,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany(); // clear old products
    await Product.insertMany(products);
    console.log(`✅ ${products.length} products added to database!`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seed();
