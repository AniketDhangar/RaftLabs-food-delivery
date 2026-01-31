import api from "../../services/api/axios";

export const placeOrderApi = (data) => {
  return api.post("/orders", data);
};