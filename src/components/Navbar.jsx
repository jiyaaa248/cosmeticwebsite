import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo/glamora-logo-removebg-preview.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

        {/* Logo Image */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Glamora Logo"
            className="h-16 md:h-20 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link className="hover:text-pink-600 transition" to="/">Home</Link>
          <Link className="hover:text-pink-600 transition" to="/shop">Shop</Link>
          <Link className="hover:text-pink-600 transition" to="/about">About</Link>
          <Link className="hover:text-pink-600 transition" to="/contact">Contact</Link>
          <Link className="hover:text-pink-600 transition" to="/feedback">Feedback</Link>

          {token ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="text-pink-600 font-semibold hover:underline"
              >
                Hi, {user?.firstName} 🌸
              </Link>
              <button
                onClick={handleLogout}
                className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full shadow transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full shadow transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border-2 border-pink-500 text-pink-500 hover:bg-pink-50 px-5 py-2 rounded-full transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-pink-500 text-2xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-md px-6 py-4 space-y-3 shadow-lg border-t border-pink-100">
          <Link onClick={() => setOpen(false)} className="block text-gray-700 hover:text-pink-600 py-1" to="/">Home</Link>
          <Link onClick={() => setOpen(false)} className="block text-gray-700 hover:text-pink-600 py-1" to="/shop">Shop</Link>
          <Link onClick={() => setOpen(false)} className="block text-gray-700 hover:text-pink-600 py-1" to="/about">About</Link>
          <Link onClick={() => setOpen(false)} className="block text-gray-700 hover:text-pink-600 py-1" to="/contact">Contact</Link>
          <Link onClick={() => setOpen(false)} className="block text-gray-700 hover:text-pink-600 py-1" to="/feedback">Feedback</Link>

          {token ? (
            <>
              <Link onClick={() => setOpen(false)} to="/dashboard" className="block text-pink-600 font-semibold py-1">
                Dashboard ({user?.firstName})
              </Link>
              <button onClick={handleLogout} className="w-full bg-pink-500 text-white py-2 rounded-full font-semibold">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link onClick={() => setOpen(false)} to="/login" className="block text-center bg-pink-500 text-white py-2 rounded-full">Login</Link>
              <Link onClick={() => setOpen(false)} to="/register" className="block text-center border-2 border-pink-500 text-pink-500 py-2 rounded-full">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
