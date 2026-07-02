import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Cart from "../components/Cart/Cart";
import { CartProvider } from "../context/CartContext";
import { ProductProvider } from "../context/ProductContext";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  const { pathname } = useLocation();

  let headerVariant = "default";

  if (pathname === "/") headerVariant = "home";
  return (
    <>
      <Header variant={headerVariant} />
      <Cart />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
