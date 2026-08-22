import api from "./api";

const MOCK_ADMIN_EMAILS = ["testemail@mail.com"];

function normalizeUser(user) {
  if (!user) {
    return null;
  }

  const normalizedEmail = user.email?.trim().toLowerCase();

  const isMockAdmin =
    import.meta.env.DEV && MOCK_ADMIN_EMAILS.includes(normalizedEmail);

  return {
    ...user,
    isAdmin: user.isAdmin ?? user.is_staff ?? isMockAdmin,
  };
}

export async function loginUser(email, password) {
  const response = await api.post("/api/login/", {
    email,
    password,
  });

  const { user, access } = response.data;

  localStorage.setItem("access_token", access);

  return {
    user: normalizeUser(user),
    token: access,
  };
}

export async function registerUser(name, surname, email, phone, password) {
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
    user: normalizeUser(response.data),
    token,
  };
}

export async function updateUser(updatedData) {
  const response = await api.put("/api/me/", updatedData);

  return {
    user: normalizeUser(response.data),
  };
}
