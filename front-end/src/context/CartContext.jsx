import React from "react";
import {
  addToCartItem,
  removeFromCartItem,
  getCartItems,
  updateQuantityItem,
  clearCartItem,
} from "../api/cartApi";

const CartContext = React.createContext(null);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [cartLoading, setCartLoading] = React.useState(false);
  const [cartActionLoading, setCartActionLoading] = React.useState(false);
  const [cartError, setCartError] = React.useState(null);

  const toggleCart = React.useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const openCart = React.useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = React.useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const [cartItems, setCartItems] = React.useState([
    { productId: 123435, quantity: 3 },
    { productId: 123438, quantity: 1 },
    { productId: 123433, quantity: 2 },
    { productId: 123434, quantity: 1 },
  ]);

  const getCart = React.useCallback(async () => {
    try {
      setCartLoading(true);
      const data = await getCartItems();
      setCartItems(data.cartItems);
    } catch (error) {
      setCartError(error.message);
      console.error("Error fetching cart items:", error);
    } finally {
      setCartLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getCart();
  }, [getCart]);

  const addToCart = React.useCallback(async (productId) => {
    try {
      setCartActionLoading(true);
      const data = await addToCartItem(productId);

      setCartItems(data.cartItems);
    } catch (error) {
      setCartError(error.message);
      console.error("Error adding to cart:", error);
    } finally {
      setCartActionLoading(false);
    }
  }, []);

  const removeFromCart = React.useCallback(async (productId) => {
    try {
      setCartActionLoading(true);
      const data = await removeFromCartItem(productId);
      setCartItems(data.cartItems);
    } catch (error) {
      setCartError(error.message);
      console.error("Error removing from cart:", error);
    } finally {
      setCartActionLoading(false);
    }
  }, []);

  const updateQuantity = React.useCallback(
    async (productId, quantity) => {
      try {
        setCartActionLoading(true);
        if (quantity <= 0) {
          return await removeFromCart(productId);
        }

        const data = await updateQuantityItem(productId, quantity);
        setCartItems(data.cartItems);
      } catch (error) {
        setCartError(error.message);
        console.error("Error updating cart quantity:", error);
      } finally {
        setCartActionLoading(false);
      }
    },
    [removeFromCart],
  );

  const clearCart = React.useCallback(async () => {
    try {
      setCartActionLoading(true);
      const data = await clearCartItem();
      setCartItems(data.cartItems);
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setCartActionLoading(false);
    }
  }, []);

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
