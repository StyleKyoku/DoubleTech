import { cartItems } from "../data/cartItems";

function getPublicUserCart(userId) {
  const userCartItems = cartItems.filter((item) => item.userId === userId);

  return userCartItems.map(toPublicCartItem);
}

function toPublicCartItem(cartItem) {
  return {
    productId: cartItem.productId,
    quantity: cartItem.quantity,
  };
}

export async function getCartItems(userId) {
  return {
    cartItems: getPublicUserCart(userId),
  };
}

export async function addToCartItem(userId, productId) {
  const existingCartItem = cartItems.find(
    (item) => item.userId === userId && item.productId === productId,
  );

  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    const newCartItem = {
      id: Date.now(),
      userId,
      productId,
      quantity: 1,
    };
    cartItems.push(newCartItem);
  }

  return {
    cartItems: getPublicUserCart(userId),
  };
}

export async function removeFromCartItem(userId, productId) {
  const existingCartItem = cartItems.find(
    (item) => item.userId === userId && item.productId === productId,
  );

  if (existingCartItem) {
    const index = cartItems.indexOf(existingCartItem);
    cartItems.splice(index, 1);
  }

  return {
    cartItems: getPublicUserCart(userId),
  };
}

export async function updateQuantityItem(userId, productId, quantity) {
  if (quantity <= 0) {
    return removeFromCartItem(userId, productId);
  }

  const existingCartItem = cartItems.find(
    (item) => item.userId === userId && item.productId === productId,
  );

  if (existingCartItem) {
    existingCartItem.quantity = quantity;
  }

  return {
    cartItems: getPublicUserCart(userId),
  };
}

export async function clearCartItem(userId) {
  const userCartItems = cartItems.filter((item) => item.userId === userId);
  userCartItems.forEach((item) => {
    const index = cartItems.indexOf(item);
    cartItems.splice(index, 1);
  });

  return {
    cartItems: [],
  };
}

/*
const API_URL_BASE = "http://localhost:3000/api/cart";

  async function handleResponse(response) {
  if (!response.ok) {
    throw new Error("API request failed");
  }
  return response.json();
}

export async function addToCartItem(productId, quantity = 1) {
  const response = await fetch(`${API_URL_BASE}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return handleResponse(response);
}

export async function removeFromCartItem(productId) {
  const response = await fetch(`${API_URL_BASE}/items/${productId}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}

export async function getCartItems() {
  const response = await fetch(`${API_URL_BASE}/items`, {
    method: "GET",
  });
  return handleResponse(response);
}

export async function updateQuantityItem(productId, quantity) {
  const response = await fetch(`${API_URL_BASE}/items/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });
  return handleResponse(response);
}

export async function clearCartItem() {
  const response = await fetch(`${API_URL_BASE}/items`, {
    method: "DELETE",
  });
  return handleResponse(response);
}

*/
