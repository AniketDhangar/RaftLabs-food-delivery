import api from "../../services/api/axios";

export const fetchMenuApi = (params) => {
  return api.get("/menu", { params });
};
