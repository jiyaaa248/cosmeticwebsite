import { useState, useEffect } from "react";
import CategoryButtons from "../components/CategoryButtons";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [category, setCategory]   = useState("all");
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const url =
          category === "all"
            ? "http://localhost:5000/api/products"
            : `http://localhost:5000/api/products?category=${category}`;

        const res  = await fetch(url);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);
        setProducts(data);
      } catch (err) {
        setError("Could not load products. Make sure backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-pink-50 px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-pink-500 mb-2">Shop Glamora 💕</h1>
      <p className="text-center text-gray-500 mb-8">Discover our premium beauty collection</p>

      <CategoryButtons active={category} setActive={setCategory} />

      {loading && (
        <div className="text-center py-20">
          <p className="text-pink-400 text-xl animate-pulse">Loading products... 🌸</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
