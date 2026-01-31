import api from "../../services/api/axios";

export const createPaymentApi = (data) => {
  return api.post("/payments", data);
};
