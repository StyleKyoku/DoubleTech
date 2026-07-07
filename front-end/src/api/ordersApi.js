import { orders } from "../data/orders";
import { products } from "../data/products";

const ACTIVE_ORDER_STATUSES = ["paid", "onTheWay"];
const PAST_ORDER_STATUSES = ["delivered", "cancelled"];
const VALID_ORDER_STATUSES = [...ACTIVE_ORDER_STATUSES, ...PAST_ORDER_STATUSES];

function getOrderTotal(items) {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

function getOrderStage(status) {
  if (ACTIVE_ORDER_STATUSES.includes(status)) {
    return "active";
  }

  if (PAST_ORDER_STATUSES.includes(status)) {
    return "past";
  }

  return "unknown";
}

function getStatusLabel(status) {
  if (status === "paid") return "Paid";
  if (status === "onTheWay") return "On its way";
  if (status === "delivered") return "Delivered";
  if (status === "cancelled") return "Cancelled";

  return "Unknown";
}

function toPublicOrder(order) {
  return {
    id: order.id,
    userId: order.userId,

    status: order.status,
    statusLabel: getStatusLabel(order.status),
    stage: getOrderStage(order.status),

    createdAt: order.createdAt,
    estimatedDelivery: order.estimatedDelivery,
    deliveredAt: order.deliveredAt || null,
    cancelledAt: order.cancelledAt || null,

    trackingNumber: order.trackingNumber,
    deliveryAddress: order.deliveryAddress,

    items: order.items,
    total: getOrderTotal(order.items),
  };
}

function getPublicUserOrders(userId) {
  return orders
    .filter((order) => order.userId === userId)
    .map(toPublicOrder)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function getOrdersResponse(userId) {
  const userOrders = getPublicUserOrders(userId);

  return {
    orders: userOrders,
    activeOrders: userOrders.filter((order) => order.stage === "active"),
    pastOrders: userOrders.filter((order) => order.stage === "past"),
  };
}

function findProduct(productId) {
  const product = products.find((product) => product.id === productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

function buildOrderItem(item) {
  const product = findProduct(item.productId);

  return {
    productId: product.id,
    title: product.title,
    price: product.price,
    quantity: item.quantity,
    imageUrl: product.imageUrls?.[0] || "",
  };
}

function createTrackingNumber(index) {
  return `DT-${Date.now()}-${index + 1}`;
}

function createEstimatedDeliveryDate() {
  const date = new Date();

  date.setDate(date.getDate() + 7);

  return date.toISOString();
}

function createOrderFromItem(userId, item, index) {
  const orderItem = buildOrderItem(item);

  return {
    id: Date.now() + index,
    userId,
    status: "paid",
    createdAt: new Date().toISOString(),
    estimatedDelivery: createEstimatedDeliveryDate(),
    trackingNumber: createTrackingNumber(index),
    deliveryAddress: "Dublin, Ireland",
    items: [orderItem],
  };
}

export async function getOrders(userId) {
  return getOrdersResponse(userId);
}

export async function createOrders(userId, items) {
  if (!items.length) {
    throw new Error("Order items are empty");
  }

  const createdOrders = items.map((item, index) => {
    return createOrderFromItem(userId, item, index);
  });

  orders.push(...createdOrders);

  return {
    createdOrders: createdOrders.map(toPublicOrder),
    ...getOrdersResponse(userId),
  };
}

export async function updateOrderStatus(userId, orderId, status) {
  if (!VALID_ORDER_STATUSES.includes(status)) {
    throw new Error("Invalid order status");
  }

  const order = orders.find((order) => {
    return order.id === orderId && order.userId === userId;
  });

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = status;

  if (status === "delivered") {
    order.deliveredAt = new Date().toISOString();
  }

  if (status === "cancelled") {
    order.cancelledAt = new Date().toISOString();
  }

  return {
    order: toPublicOrder(order),
    ...getOrdersResponse(userId),
  };
}
