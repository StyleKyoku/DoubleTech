/*
import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import ProfileLayout from "./layouts/ProfileLayout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage/LoginPage";
import Catalog from "./pages/Catalog/Catalog";
import ProfilePage from "./pages/account/ProfilePage/ProfilePage";
import ApiExample from "./apiExample";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog" element={<Catalog />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProfileLayout />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
*/

// api things
// so here are some tests I tried to do, this shit was made by chatgpt, it doesnt work. Hopefully it gives u the idea of how to use api tho
import React, { useState, useEffect } from "react";
import api from "./api/api"; 

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: ""
  });

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users/"); 
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/users/", form); // POST with axios instance
      setForm({ name: "", surname: "", email: "", password: "" });
      fetchUsers(); // refresh list
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="surname"
          value={form.surname}
          onChange={handleChange}
          placeholder="Surname"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Add User</button>
      </form>

      <h2>Existing Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} {user.surname} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
