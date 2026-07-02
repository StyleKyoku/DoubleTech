import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Cart from "../components/Cart/Cart";
import { CartProvider } from "../context/CartContext";
import { ProductProvider } from "../context/ProductContext";
import { AuthProvider } from "../context/AuthContext";

export default function ProfileLayout() {
  return (
    <>
      <main>
        <Cart />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
