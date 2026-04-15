import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

import lipstick   from "../assets/images/makeup/lipstick.jpg";
import foundation from "../assets/images/makeup/foundation.jpg";
import serum      from "../assets/images/skincare/serum.jpg";
import shampoo    from "../assets/images/haircare/shampoo.jpg";
import product1   from "../assets/images/product1.jpg";
import product2   from "../assets/images/product2.jpg";
import product3   from "../assets/images/product3.jpg";

const imageMap = { lipstick, foundation, serum, shampoo, product1, product2, product3 };

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [qty, setQty]         = useState(1);
  const [added, setAdded]     = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res  = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setProduct(data);
      } catch (err) {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const result = await addToCart(product, qty);
    if (result?.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      <p className="text-pink-400 text-xl animate-pulse">Loading... 🌸</p>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center gap-4">
      <p className="text-red-500 text-lg">{error}</p>
      <button onClick={() => navigate("/shop")} className="text-pink-500 underline">← Back to Shop</button>
    </div>
  );

  const imgSrc = imageMap[product.image] || product1;

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-6 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full grid md:grid-cols-2 gap-10">

        <img
          src={imgSrc}
          alt={product.name}
          className="rounded-2xl object-cover w-full h-80"
        />

        <div className="flex flex-col justify-center">
          <span className="inline-block bg-pink-100 text-pink-500 text-xs px-3 py-1 rounded-full capitalize mb-3 w-fit">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>
          <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
          <p className="text-3xl font-bold text-pink-500 mb-6">NPR {product.price}</p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-500 font-medium text-sm">✅ In Stock</span>
            <span className="text-gray-400 text-sm">({product.stock} available)</span>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-gray-600 text-sm font-medium">Qty:</span>
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200 transition"
            >−</button>
            <span className="w-8 text-center font-semibold text-gray-800">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200 transition"
            >+</button>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-8 py-3 rounded-full shadow text-lg font-semibold transition ${
              added
                ? "bg-green-500 text-white"
                : "bg-pink-500 hover:bg-pink-600 text-white"
            }`}
          >
            {added ? "✓ Added to Cart!" : "Add to Cart 💖"}
          </button>

          <button
            onClick={() => navigate("/shop")}
            className="mt-4 text-pink-500 hover:underline text-sm"
          >
            ← Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
}
