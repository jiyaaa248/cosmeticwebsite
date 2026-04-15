import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    price:       { type: Number, required: true },
    category:    { type: String, required: true, enum: ["makeup", "skincare", "haircare"] },
    description: { type: String, required: true },
    image:       { type: String, required: true }, // image filename e.g. "lipstick.jpg"
    stock:       { type: Number, default: 100 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
