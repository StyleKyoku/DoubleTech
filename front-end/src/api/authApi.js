import { users } from "../data/users";

let activeSession = null;

function wait(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mockToken(userId) {
  return `mock-token-${userId}-${Date.now()}`;
}

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

function findCurrentUser() {
  if (!activeSession) return null;
  const currentUser = users.find((user) => {
    return user.id === activeSession.userId;
  });

  return currentUser || null;
}

export async function loginUser(email, password) {
  await wait();

  const normalizedEmail = email.trim().toLowerCase();

  const foundUser = users.find(
    (user) => user.email.toLowerCase() === normalizedEmail,
  );

  if (!foundUser) {
    throw new Error("User not found");
  }

  if (foundUser.password !== password) {
    throw new Error("Invalid password");
  }

  activeSession = {
    userId: foundUser.id,
    token: mockToken(foundUser.id),
  };

  return {
    user: sanitizeUser(foundUser),
    token: activeSession.token,
  };
}

export async function registerUser(name, surname, email, phone, password) {
  await wait();

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === normalizedEmail,
  );

  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser = {
    id: users.length + 1,
    name: name.trim(),
    surname: surname.trim(),
    email: normalizedEmail,
    phone: phone.trim(),
    password,
  };

  users.push(newUser);

  activeSession = {
    userId: newUser.id,
    token: mockToken(newUser.id),
  };

  return {
    user: sanitizeUser(newUser),
    token: activeSession.token,
  };
}

export async function logoutUser() {
  await wait();
  activeSession = null;

  return { success: true };
}

export async function getCurrentUser() {
  await wait();
  const currentUser = findCurrentUser();

  if (!currentUser) {
    throw new Error("No active session");
  }

  return {
    user: sanitizeUser(currentUser),
    token: activeSession.token,
  };
}

export async function updateUser(updatedData) {
  await wait();
  const currentUser = findCurrentUser();

  if (!currentUser) {
    throw new Error("No active session");
  }

  currentUser.name = updatedData.name.trim();
  currentUser.surname = updatedData.surname.trim();
  currentUser.email = updatedData.email.trim().toLowerCase();
  currentUser.phone = updatedData.phone.trim();

  return {
    user: sanitizeUser(currentUser),
  };
}
