import ApiError from "../../utils/ApiError.js";
import orderRepository from "./order.repository.js";
import menuRepository from "../menu/menu.repository.js";


const placeOrder = async ({ userId, items, deliveryAddress, phone }) => {
  if (!items || items.length === 0) {
    throw new ApiError(400, "Order must contain at least one item");
  }

  let orderItems = [];
  let totalAmount = 0;

  for (const item of items) {
    const menuItem = await menuRepository.findById(item.menuItemId);

    if (!menuItem || !menuItem.isAvailable) {
      throw new ApiError(400, "Invalid or unavailable menu item");
    }

    const itemTotal = menuItem.price * item.quantity;
    totalAmount += itemTotal;

    orderItems.push({
      menuItem: menuItem._id,
      quantity: item.quantity,
      price: menuItem.price,
    });
  }

  const order = await orderRepository.createOrder({
    user: userId,
    items: orderItems,
    totalAmount,
    deliveryAddress,
    phone,
  });

  return order;
};


const getUserOrders = async (userId, query) => {
  return orderRepository.getUserOrdersPaginated({
    userId,
    ...query,
  });
};


const getAllOrders = async (query) => {
  return orderRepository.getAllOrdersPaginated(query);
};


const getOrderById = async (orderId, user) => {
  const order = await orderRepository.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (
    user.role !== "ADMIN" &&
    order.user._id.toString() !== user.id
  ) {
    throw new ApiError(403, "Access denied");
  }

  return order;
};


const updateOrderStatus = async (orderId, status) => {
  const allowedStatuses = [
    "ORDER_RECEIVED",
    "PREPARING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid order status");
  }

  const updatedOrder = await orderRepository.updateStatus(
    orderId,
    status
  );

  if (!updatedOrder) {
    throw new ApiError(404, "Order not found");
  }

  return updatedOrder;
};

export default {
  placeOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
