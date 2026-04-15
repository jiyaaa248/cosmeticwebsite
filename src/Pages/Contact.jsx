import { useState } from "react";
import contactBg from "../assets/images/contact-bg.jpg";
import decor from "../assets/images/decor.jpg";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
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
      const res  = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send message");
        return;
      }

      setSuccess(data.message);
      setFormData({ name: "", email: "", subject: "", message: "" }); // clear form
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <img src={contactBg} alt="Contact" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-pink-100/60"></div>

      <div className="relative z-10 w-full max-w-5xl px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center text-pink-500 mb-2">Contact Us</h1>
        <p className="text-center text-pink-700 mb-8">Beauty begins with a conversation 💄</p>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-lg px-8 py-6">
            <h2 className="text-xl font-bold text-pink-500 mb-4">Send a Message</h2>

            {success && (
              <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-lg mb-4 text-sm text-center">
                {success}
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text" name="name" placeholder="Name"
                value={formData.name} onChange={handleChange} required
                className="w-full py-2 px-4 rounded-full border border-pink-200 focus:ring-1 focus:ring-pink-400 outline-none text-sm"
              />
              <input
                type="email" name="email" placeholder="Email"
                value={formData.email} onChange={handleChange} required
                className="w-full py-2 px-4 rounded-full border border-pink-200 focus:ring-1 focus:ring-pink-400 outline-none text-sm"
              />
              <input
                type="text" name="subject" placeholder="Subject"
                value={formData.subject} onChange={handleChange} required
                className="w-full py-2 px-4 rounded-full border border-pink-200 focus:ring-1 focus:ring-pink-400 outline-none text-sm"
              />
              <textarea
                name="message" placeholder="Message" rows="3"
                value={formData.message} onChange={handleChange} required
                className="w-full py-2 px-4 rounded-2xl border border-pink-200 focus:ring-1 focus:ring-pink-400 outline-none resize-none text-sm"
              />
              <button
                type="submit" disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white py-2 rounded-full font-semibold text-sm shadow transition"
              >
                {loading ? "Sending... 💖" : "Send 💖"}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="rounded-3xl px-8 py-6 text-white shadow-lg bg-gradient-to-br from-pink-400 to-rose-400">
            <img src={decor} alt="Decor" className="w-full h-[150px] object-cover rounded-2xl mb-4" />
            <div className="w-full h-[2px] bg-white/70 rounded-full mb-4"></div>
            <h2 className="text-xl font-bold mb-4">Contact Info ✨</h2>
            <div className="space-y-3 text-sm">
              <p>💌 support@glamora.com</p>
              <p>📞 +977 9812345678</p>
              <p>📍 Biratnagar, Nepal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
