import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { OrdersProvider } from "./context/OrdersContext.jsx";
import App from "./App.jsx";

import "./styles/index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrdersProvider>
              <App />
            </OrdersProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
);
