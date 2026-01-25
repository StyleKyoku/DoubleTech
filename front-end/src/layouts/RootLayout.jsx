<<<<<<< HEAD
import { Outlet, useLocation } from "react-router-dom";
=======
import { Outlet } from "react-router-dom";
>>>>>>> origin/main
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function RootLayout() {
<<<<<<< HEAD
  const { pathname } = useLocation();

  let headerVariant = "default";

  if (pathname === "/") headerVariant = "home";
  return (
    <>
      <Header variant={headerVariant} />
=======
  return (
    <>
      <Header />
>>>>>>> origin/main
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/main
