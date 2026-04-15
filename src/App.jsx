import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoutes";

import Home          from "./Pages/Home";
import Shop          from "./Pages/Shop";
import ProductDetail from "./Pages/ProductDetails";
import Login         from "./Pages/Login";
import Register      from "./Pages/Register";
import About         from "./Pages/About";
import Contact       from "./Pages/Contact";
import Feedback      from "./Pages/Feedback";
import Dashboard     from "./Pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <div className="pt-20 min-h-screen">
          <Routes>
            {/* Public routes */}
            <Route path="/"           element={<Home />} />
            <Route path="/shop"       element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login"      element={<Login />} />
            <Route path="/register"   element={<Register />} />
            <Route path="/about"      element={<About />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/feedback"   element={<Feedback />} />

            {/* Protected route - must be logged in */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
