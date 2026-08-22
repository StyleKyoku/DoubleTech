import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import AdminLayout from "./layouts/AdminLayout";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/auth/LoginPage/LoginPage";
import Catalog from "./pages/Catalog/Catalog";
import ProfilePage from "./pages/account/ProfilePage/ProfilePage";
import AccountSettings from "./pages/account/AccountSettings/AccountSettings";

import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import MyOrders from "./pages/account/OrdersPage/MyOrders";
import ProductPage from "./pages/ProductPage/ProductPage";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
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
      <Route element={<ProtectedRoute adminOnly={true} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Route>
      <Route element={<EmptyLayout />}>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
