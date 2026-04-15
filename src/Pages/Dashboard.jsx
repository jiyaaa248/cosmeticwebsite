import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import lipstick   from "../assets/images/makeup/lipstick.jpg";
import foundation from "../assets/images/makeup/foundation.jpg";
import serum      from "../assets/images/skincare/serum.jpg";
import shampoo    from "../assets/images/haircare/shampoo.jpg";
import product1   from "../assets/images/product1.jpg";
import product2   from "../assets/images/product2.jpg";
import product3   from "../assets/images/product3.jpg";

const imageMap = { lipstick, foundation, serum, shampoo, product1, product2, product3 };

const TABS = [
  { id: "profile", label: "👤 Profile",   icon: "👤" },
  { id: "cart",    label: "🛒 My Cart",   icon: "🛒" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart, cartLoading } = useCart();
  const [activeTab, setActiveTab] = useState("profile");
  const [clearConfirm, setClearConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleClearCart = async () => {
    if (!clearConfirm) { setClearConfirm(true); return; }
    await clearCart();
    setClearConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-xl">🌸</div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">Welcome back</p>
              <h1 className="text-lg font-bold text-gray-800">{user?.firstName} {user?.lastName}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm text-pink-500 hover:text-pink-600 font-medium border border-pink-200 px-4 py-2 rounded-full hover:bg-pink-50 transition">
              🛍️ Shop
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-red-500 border border-gray-200 px-4 py-2 rounded-full hover:bg-red-50 transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 text-center">
            <p className="text-3xl font-bold text-pink-500">{cartCount}</p>
            <p className="text-gray-500 text-sm mt-1">Items in Cart</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 text-center">
            <p className="text-3xl font-bold text-pink-500">NPR {cartTotal.toLocaleString()}</p>
            <p className="text-gray-500 text-sm mt-1">Cart Total</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 text-center col-span-2 sm:col-span-1">
            <p className="text-3xl font-bold text-pink-500 capitalize">{user?.role}</p>
            <p className="text-gray-500 text-sm mt-1">Account Type</p>
          </div>
        </div>

        {/* Tab nav */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-2 shadow-sm border border-pink-100 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-pink-500 text-white shadow"
                  : "text-gray-500 hover:text-pink-500 hover:bg-pink-50"
              }`}
            >
              {tab.label}
              {tab.id === "cart" && cartCount > 0 && (
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "cart" ? "bg-white text-pink-500" : "bg-pink-500 text-white"
                }`}>{cartCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 h-24 relative">
              <div className="absolute -bottom-10 left-8">
                <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center text-3xl">
                  🌸
                </div>
              </div>
            </div>
            <div className="pt-14 pb-8 px-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500 text-sm mb-6">{user?.email}</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "First Name",  value: user?.firstName },
                  { label: "Last Name",   value: user?.lastName  },
                  { label: "Email",       value: user?.email     },
                  { label: "Account Role",value: user?.role, pill: true },
                ].map((field) => (
                  <div key={field.label} className="bg-pink-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{field.label}</p>
                    {field.pill ? (
                      <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                        {field.value}
                      </span>
                    ) : (
                      <p className="font-semibold text-gray-800">{field.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  to="/shop"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition"
                >
                  🛍️ Continue Shopping
                </Link>
                <button
                  onClick={() => setActiveTab("cart")}
                  className="border border-pink-200 text-pink-500 hover:bg-pink-50 px-6 py-2.5 rounded-xl font-semibold text-sm transition"
                >
                  🛒 View Cart ({cartCount})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── CART TAB ── */}
        {activeTab === "cart" && (
          <div>
            {cartLoading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-16 text-center">
                <p className="text-pink-400 animate-pulse text-lg">Loading your cart... 🌸</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-16 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h3>
                <p className="text-gray-400 mb-6">Add some products to get started!</p>
                <Link
                  to="/shop"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition inline-block"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-6">

                {/* Cart items list */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => {
                    const imgSrc = imageMap[item.image] || product1;
                    return (
                      <div key={item.productId} className="bg-white rounded-2xl shadow-sm border border-pink-100 p-4 flex gap-4 items-center">
                        <img
                          src={imgSrc}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
                          <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full capitalize inline-block mt-1">
                            {item.category}
                          </span>
                          <p className="text-pink-500 font-bold mt-1">NPR {item.price}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {/* Qty controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200 transition text-sm"
                            >−</button>
                            <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 font-bold hover:bg-pink-200 transition text-sm"
                            >+</button>
                          </div>
                          <p className="text-sm font-bold text-gray-700">
                            NPR {(item.price * item.quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-xs text-red-400 hover:text-red-600 transition"
                          >
                            🗑️ Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 sticky top-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Items ({cartCount})</span>
                        <span>NPR {cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-500 font-medium">Free</span>
                      </div>
                      <div className="border-t border-pink-100 pt-3 flex justify-between font-bold text-gray-800">
                        <span>Total</span>
                        <span className="text-pink-500 text-lg">NPR {cartTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition mb-3">
                      Proceed to Checkout 💳
                    </button>

                    <button
                      onClick={handleClearCart}
                      className={`w-full py-2.5 rounded-xl font-semibold text-sm transition ${
                        clearConfirm
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                      }`}
                    >
                      {clearConfirm ? "Tap again to confirm clear" : "🗑️ Clear Cart"}
                    </button>

                    {clearConfirm && (
                      <button
                        onClick={() => setClearConfirm(false)}
                        className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600"
                      >
                        Cancel
                      </button>
                    )}

                    <Link
                      to="/shop"
                      className="block text-center mt-4 text-pink-500 hover:text-pink-600 text-sm font-medium hover:underline"
                    >
                      ← Continue Shopping
                    </Link>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
