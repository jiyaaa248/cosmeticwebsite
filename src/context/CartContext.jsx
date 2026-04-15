import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  // Fetch cart from backend whenever user logs in
  const fetchCart = useCallback(async () => {
    if (!token) { setCartItems([]); return; }
    setCartLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setCartItems(data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setCartLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product, quantity = 1) => {
    if (!token) return alert("Please login to add items to cart.");
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          name:      product.name,
          price:     product.price,
          image:     product.image,
          category:  product.category,
          quantity,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCartItems(data);
        return { success: true };
      }
    } catch (err) {
      console.error("Add to cart failed", err);
    }
    return { success: false };
  };

  const updateQuantity = async (productId, quantity) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();
      if (res.ok) setCartItems(data);
    } catch (err) {
      console.error("Update quantity failed", err);
    }
  };

  const removeFromCart = async (productId) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setCartItems(data);
    } catch (err) {
      console.error("Remove from cart failed", err);
    }
  };

  const clearCart = async () => {
    if (!token) return;
    try {
      await fetch("http://localhost:5000/api/cart", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems([]);
    } catch (err) {
      console.error("Clear cart failed", err);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, cartLoading, cartCount, cartTotal,
      addToCart, updateQuantity, removeFromCart, clearCart, fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
