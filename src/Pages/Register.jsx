import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerBg from "../assets/images/register-bg.jpg";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res  = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      navigate("/login");
    } catch (err) {
      setError("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-10">
      <img src={registerBg} alt="Register" className="absolute inset-0 w-full h-full object-cover brightness-75" />

      <div className="relative z-10 bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-pink-500 text-center mb-6">Create Account 🌸</h2>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text"     name="firstName" placeholder="First Name"            value={formData.firstName} onChange={handleChange} required className="border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80" />
          <input type="text"     name="lastName"  placeholder="Last Name"             value={formData.lastName}  onChange={handleChange} required className="border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80" />
          <input type="email"    name="email"     placeholder="Email"                 value={formData.email}     onChange={handleChange} required className="border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80" />
          <input type="password" name="password"  placeholder="Password (min 6 chars)" value={formData.password}  onChange={handleChange} required className="border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80" />

          <button type="submit" disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white py-3 rounded-lg font-semibold transition">
            {loading ? "Creating Account... 🌸" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
