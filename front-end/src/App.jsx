import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import ProfileLayout from "./layouts/ProfileLayout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage/LoginPage";
import Catalog from "./pages/Catalog/Catalog";
import ProfilePage from "./pages/account/ProfilePage/ProfilePage";
import Test1 from "./pages/Tests/test1.jsx";

import ProductPage from "./pages/ProductPage/ProductPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/product" element={<ProductPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProfileLayout />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
