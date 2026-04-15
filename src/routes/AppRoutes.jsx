import { Routes, Route } from "react-router-dom";
import Home          from "../Pages/Home";
import Shop          from "../Pages/Shop";
import ProductDetail from "../Pages/ProductDetails";
import Login         from "../Pages/Login";
import Register      from "../Pages/Register";
import About         from "../Pages/About";
import Contact       from "../Pages/Contact";
import Feedback      from "../Pages/Feedback";
import Dashboard     from "../Pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"           element={<Home />} />
      <Route path="/shop"       element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login"      element={<Login />} />
      <Route path="/register"   element={<Register />} />
      <Route path="/about"      element={<About />} />
      <Route path="/contact"    element={<Contact />} />
      <Route path="/feedback"   element={<Feedback />} />
      <Route path="/dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  );
}
