import { Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import LoginPage from './pages/auth/LoginPage/LoginPage'
import Catalog from './pages/Catalog/Catalog'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}