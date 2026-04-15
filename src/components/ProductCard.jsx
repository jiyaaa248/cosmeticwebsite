import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

import lipstick   from "../assets/images/makeup/lipstick.jpg";
import foundation from "../assets/images/makeup/foundation.jpg";
import serum      from "../assets/images/skincare/serum.jpg";
import shampoo    from "../assets/images/haircare/shampoo.jpg";
import product1   from "../assets/images/product1.jpg";
import product2   from "../assets/images/product2.jpg";
import product3   from "../assets/images/product3.jpg";

const imageMap = { lipstick, foundation, serum, shampoo, product1, product2, product3 };

export default function ProductCard({ product }) {
  const imgSrc = imageMap[product.image] || product1;
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault(); // prevent navigating to product page
    const result = await addToCart(product, 1);
    if (result?.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden hover:-translate-y-1 duration-200 flex flex-col">
      <Link to={`/product/${product._id}`}>
        <img
          src={imgSrc}
          alt={product.name}
          className="h-56 w-full object-cover"
        />
      </Link>
      <div className="p-4 text-center flex flex-col flex-1">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg text-gray-800 hover:text-pink-500 transition">{product.name}</h3>
        </Link>
        <p className="text-pink-500 font-bold mt-1">NPR {product.price}</p>
        <span className="inline-block mt-2 text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full capitalize">
          {product.category}
        </span>
        <button
          onClick={handleAddToCart}
          className={`mt-4 w-full py-2 rounded-xl font-semibold text-sm transition ${
            added
              ? "bg-green-100 text-green-600"
              : "bg-pink-500 hover:bg-pink-600 text-white"
          }`}
        >
          {added ? "✓ Added!" : "🛒 Add to Cart"}
        </button>
      </div>
    </div>
  );
}
