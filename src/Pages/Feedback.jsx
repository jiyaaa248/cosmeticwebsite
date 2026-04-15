import { useState } from "react";

export default function Feedback() {
  const [formData, setFormData] = useState({ name: "", email: "", rating: 5, message: "" });
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState("");
  const [error, setError]       = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res  = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating: Number(formData.rating) }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to submit feedback");
        return;
      }

      setSuccess(data.message);
      setFormData({ name: "", email: "", rating: 5, message: "" });
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1600&auto=format&fit=crop&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-sm">

        <h1 className="text-2xl font-bold text-pink-500 text-center mb-1">Share Your Feedback 💖</h1>
        <p className="text-center text-gray-500 text-sm mb-6">We love hearing from you!</p>

        {success && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-3 py-2 rounded-lg mb-4 text-center text-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text" name="name" placeholder="Your Name"
            value={formData.name} onChange={handleChange} required
            className="border border-pink-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="email" name="email" placeholder="Your Email"
            value={formData.email} onChange={handleChange} required
            className="border border-pink-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Star Rating */}
          <div>
            <label className="text-gray-600 font-medium text-sm mb-1 block">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className={`text-2xl transition ${
                    formData.rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <textarea
            name="message" placeholder="Write your feedback..."
            rows="3" value={formData.message} onChange={handleChange} required
            className="border border-pink-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
          />

          <button
            type="submit" disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white py-2.5 rounded-lg font-semibold text-sm transition"
          >
            {loading ? "Submitting... 🌸" : "Submit Feedback 🌸"}
          </button>
        </form>
      </div>
    </div>
  );
}