import { Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}