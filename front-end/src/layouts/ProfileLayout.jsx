import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

export default function ProfileLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
