import React from "react";
import {
  addToCartItem,
  removeFromCartItem,
  getCartItems,
  updateQuantityItem,
  clearCartItem,
} from "../api/cartApi";
import { useAuth } from "./AuthContext";

const CartContext = React.createContext(null);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [cartLoading, setCartLoading] = React.useState(false);
  const [cartActionLoading, setCartActionLoading] = React.useState(false);
  const [cartError, setCartError] = React.useState(null);

  const { user, authLoading } = useAuth();
  const [cartItems, setCartItems] = React.useState([]);

  const toggleCart = React.useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const openCart = React.useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = React.useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const getCart = React.useCallback(async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    try {
      setCartLoading(true);
      const data = await getCartItems(user.id);
      setCartItems(data.cartItems);
    } catch (error) {
      setCartError(error.message);
      console.error("Error fetching cart items:", error);
    } finally {
      setCartLoading(false);
    }
  }, [user]);

  React.useEffect(() => {
    if (authLoading) {
      return;
    }

    getCart();
  }, [authLoading, getCart]);

  React.useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setCartItems([]);
      setIsCartOpen(false);
      setCartError(null);
    }
  }, [authLoading, user]);

  const addToCart = React.useCallback(
    async (productId) => {
      if (!user) {
        setCartError("User not authenticated");
        return false;
      }

      try {
        setCartActionLoading(true);
        const data = await addToCartItem(user.id, productId);

        setCartItems(data.cartItems);
        return true;
      } catch (error) {
        setCartError(error.message);
        console.error("Error adding to cart:", error);
        return false;
      } finally {
        setCartActionLoading(false);
      }
    },
    [user],
  );

  const removeFromCart = React.useCallback(
    async (productId) => {
      if (!user) {
        setCartError("User not authenticated");
        return false;
      }
      try {
        setCartActionLoading(true);
        const data = await removeFromCartItem(user.id, productId);
        setCartItems(data.cartItems);
        return true;
      } catch (error) {
        setCartError(error.message);
        console.error("Error removing from cart:", error);
        return false;
      } finally {
        setCartActionLoading(false);
      }
    },
    [user],
  );

  const updateQuantity = React.useCallback(
    async (productId, quantity) => {
      if (!user) {
        setCartError("User not authenticated");
        return false;
      }
      try {
        setCartActionLoading(true);
        const data = await updateQuantityItem(user.id, productId, quantity);
        setCartItems(data.cartItems);
        return true;
      } catch (error) {
        setCartError(error.message);
        console.error("Error updating cart quantity:", error);
        return false;
      } finally {
        setCartActionLoading(false);
      }
    },
    [user],
  );

  const clearCart = React.useCallback(async () => {
    if (!user) {
      setCartError("User not authenticated");
      return false;
    }
    try {
      setCartActionLoading(true);
      setCartError(null);

      const data = await clearCartItem(user.id);
      setCartItems(data.cartItems);
      return true;
    } catch (error) {
      setCartError(error.message);
      console.error("Error clearing cart:", error);
      return false;
    } finally {
      setCartActionLoading(false);
    }
  }, [user]);

  const value = React.useMemo(
    () => ({
      isCartOpen,
      cartLoading,
      cartActionLoading,
      cartError,
      toggleCart,
      openCart,
      closeCart,
      cartItems,
      addToCart,
      removeFromCart,
      getCart,
      updateQuantity,
      clearCart,
    }),
    [
      isCartOpen,
      cartLoading,
      cartActionLoading,
      cartError,
      toggleCart,
      openCart,
      closeCart,
      cartItems,
      addToCart,
      removeFromCart,
      getCart,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
