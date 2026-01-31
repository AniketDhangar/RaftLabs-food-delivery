import api from "../../services/api/axios";

export const fetchAllOrdersApi = (params = {}) => {
  return api.get("/orders", { params });
};

export const updateOrderStatusApi = (orderId, status) => {
  return api.put(`/orders/${orderId}/status`, { status });
};

export const fetchAdminDashboardApi = () => {
  return api.get("/admin/dashboard");
};