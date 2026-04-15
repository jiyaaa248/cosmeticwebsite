import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../assets/images/login-bg.jpg";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res  = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      login(data.token, data.user); // saves to context + localStorage
      navigate("/dashboard");        // ✅ goes to dashboard, not home
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={loginBg} alt="Login" className="absolute inset-0 w-full h-full object-cover brightness-75" />

      <div className="relative z-10 bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-pink-500 text-center mb-6">Welcome Back 🌸</h2>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email" name="email" placeholder="Email"
            value={formData.email} onChange={handleChange} required
            className="border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80"
          />
          <input
            type="password" name="password" placeholder="Password"
            value={formData.password} onChange={handleChange} required
            className="border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80"
          />
          <button
            type="submit" disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in... 🌸" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="text-pink-500 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
