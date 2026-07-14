import React from "react";

import { createOrders, getOrders, updateOrderStatus } from "../api/ordersApi";

import { useAuth } from "./AuthContext";

const OrdersContext = React.createContext(null);

export function OrdersProvider({ children }) {
  const { user, authLoading } = useAuth();

  const [orders, setOrders] = React.useState([]);
  const [activeOrders, setActiveOrders] = React.useState([]);
  const [pastOrders, setPastOrders] = React.useState([]);

  const [ordersLoading, setOrdersLoading] = React.useState(false);
  const [orderActionLoading, setOrderActionLoading] = React.useState(false);
  const [ordersError, setOrdersError] = React.useState(null);

  const clearOrdersState = React.useCallback(() => {
    setOrders([]);
    setActiveOrders([]);
    setPastOrders([]);
    setOrdersError(null);
  }, []);

  const saveOrdersData = React.useCallback((ordersData) => {
    setOrders(ordersData.orders);
    setActiveOrders(ordersData.activeOrders);
    setPastOrders(ordersData.pastOrders);
  }, []);

  const loadOrders = React.useCallback(async () => {
    if (!user) {
      clearOrdersState();
      return;
    }

    try {
      setOrdersLoading(true);
      setOrdersError(null);

      const ordersData = await getOrders(user.id);

      saveOrdersData(ordersData);
    } catch (error) {
      setOrdersError(error.message || "Failed to load orders");
    } finally {
      setOrdersLoading(false);
    }
  }, [user, clearOrdersState, saveOrdersData]);

  React.useEffect(() => {
    if (authLoading) return;

    loadOrders();
  }, [authLoading, loadOrders]);

  const createOrdersFromItems = React.useCallback(
    async (items) => {
      if (!user) {
        setOrdersError("User not authenticated");
        return [];
      }

      try {
        setOrderActionLoading(true);
        setOrdersError(null);

        const ordersData = await createOrders(user.id, items);

        saveOrdersData(ordersData);

        return ordersData.createdOrders;
      } catch (error) {
        setOrdersError(error.message || "Failed to create orders");
        return [];
      } finally {
        setOrderActionLoading(false);
      }
    },
    [user, saveOrdersData],
  );

  const buyNow = React.useCallback(
    async (productId, quantity = 1) => {
      return createOrdersFromItems([
        {
          productId,
          quantity,
        },
      ]);
    },
    [createOrdersFromItems],
  );

  const changeOrderStatus = React.useCallback(
    async (orderId, newStatus) => {
      if (!user) {
        setOrdersError("User not authenticated");
        return null;
      }

      try {
        setOrderActionLoading(true);
        setOrdersError(null);

        const ordersData = await updateOrderStatus(user.id, orderId, newStatus);

        saveOrdersData(ordersData);

        return ordersData.order;
      } catch (error) {
        setOrdersError(error.message || "Failed to update order status");
        return null;
      } finally {
        setOrderActionLoading(false);
      }
    },
    [user, saveOrdersData],
  );

  const value = React.useMemo(
    () => ({
      orders,
      activeOrders,
      pastOrders,

      ordersCount: orders.length,
      activeOrdersCount: activeOrders.length,
      pastOrdersCount: pastOrders.length,

      ordersLoading,
      orderActionLoading,
      ordersError,

      loadOrders,
      createOrdersFromItems,
      buyNow,
      changeOrderStatus,
    }),
    [
      orders,
      activeOrders,
      pastOrders,
      ordersLoading,
      orderActionLoading,
      ordersError,
      loadOrders,
      createOrdersFromItems,
      buyNow,      
      changeOrderStatus,
    ],
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = React.useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }

  return context;
}
