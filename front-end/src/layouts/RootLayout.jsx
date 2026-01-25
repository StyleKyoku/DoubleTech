import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function RootLayout() {
  const { pathname } = useLocation();

  let headerVariant = "default";

  if (pathname === "/") headerVariant = "home";
  return (
    <>
      <Header variant={headerVariant} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
