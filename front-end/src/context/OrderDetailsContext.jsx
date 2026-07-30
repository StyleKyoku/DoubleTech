import React from "react";

const OrderDetailsContext = React.createContext(null);

export const OrderDetailsProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = React.useState(null);

  const openDetails = React.useCallback((order) => {
    setCurrentOrder(order);
  }, []);

  const closeDetails = React.useCallback(() => {
    setCurrentOrder(null);
  }, []);

  const value = React.useMemo(
    () => ({
      isDetailsOpen: currentOrder !== null,
      currentOrder,
      openDetails,
      closeDetails,
    }),
    [currentOrder, openDetails, closeDetails],
  );

  return (
    <OrderDetailsContext.Provider value={value}>
      {children}
    </OrderDetailsContext.Provider>
  );
};

export const useOrderDetails = () => {
  const context = React.useContext(OrderDetailsContext);
  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider",
    );
  }
  return context;
};
