import api from "./api";


export async function loginUser(email, password) {
  const response = await api.post("/api/login/", {
    email,
    password,
  });

  const { user, access } = response.data;

  localStorage.setItem("access_token", access);

  return {
    user,
    token: access,
  };
}


export async function registerUser(
  name,
  surname,
  email,
  phone,
  password
) {
  const response = await api.post("/api/users/", {
    name: name.trim(),
    surname: surname.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    password,
    avatarUrl: null,
  });

  return response.data;
}


export async function logoutUser() {
  localStorage.removeItem("access_token");

  return {
    success: true,
  };
}


export async function getCurrentUser() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No active session");
  }

  const response = await api.get("/api/me/");

  return {
    user: response.data,
    token,
  };
}


export async function updateUser(updatedData) {
  const response = await api.put(
    "/api/me/",
    updatedData
  );

  return {
    user: response.data,
  };
}