import orderRepository from "../order/order.repository.js";

const getDashboardStats = async () => {
  return orderRepository.getDashboardStats();
};

export default {
  getDashboardStats,
};