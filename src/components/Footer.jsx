import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-pink-50 text-gray-800 border-t border-pink-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="flex flex-col items-start">
          <span className="text-2xl font-extrabold text-pink-500 mb-3">🌸 Glamora</span>
          <p className="text-gray-700">
            Glamora brings the most elegant cosmetics to your fingertips.
            Stay beautiful, stay confident. 🌸
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-pink-500">Quick Links</h3>
          <Link className="hover:text-pink-600 transition mb-2" to="/">Home</Link>
          <Link className="hover:text-pink-600 transition mb-2" to="/shop">Shop</Link>
          <Link className="hover:text-pink-600 transition mb-2" to="/about">About</Link>
          <Link className="hover:text-pink-600 transition mb-2" to="/contact">Contact</Link>
          <Link className="hover:text-pink-600 transition" to="/feedback">Feedback</Link>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-3 text-pink-500">Connect With Us</h3>
          <p className="mb-2">💌 support@glamora.com</p>
          <p className="mb-2">📞 +977 9812345678</p>
          <p className="mb-4">📍 Biratnagar, Nepal</p>
          <div className="flex gap-4">
            <a href="#" className="text-pink-500 hover:text-pink-600 transition">Instagram</a>
            <a href="#" className="text-pink-500 hover:text-pink-600 transition">Facebook</a>
            <a href="#" className="text-pink-500 hover:text-pink-600 transition">Twitter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-pink-200 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Glamora Cosmetics. All rights reserved.
      </div>
    </footer>
  );
}
