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
