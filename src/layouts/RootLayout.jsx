import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import '../styles/Header.css'
import '../styles/footer.css'
import '../styles/App.css'

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}