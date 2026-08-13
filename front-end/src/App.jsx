import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import ProfileLayout from "./layouts/ProfileLayout.jsx";
import NotFoundLayout from "./layouts/NotFoundLayout.jsx";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage/LoginPage";
import Catalog from "./pages/Catalog/Catalog";
import ProfilePage from "./pages/account/ProfilePage/ProfilePage";
import AccountSettings from "./pages/account/AccountSettings/AccountSettings";
import MyOrders from "./pages/account/OrdersPage/MyOrders";
import Test1 from "./pages/Tests/test1.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Route>
      <Route element={<ProfileLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<ProfileLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/settings" element={<AccountSettings />} />
          <Route path="/profile/orders" element={<MyOrders />} />
        </Route>
      </Route>
      <Route element={<NotFoundLayout />}>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
