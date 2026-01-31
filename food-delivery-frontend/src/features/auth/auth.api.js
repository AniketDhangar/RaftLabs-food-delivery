import api from "../../services/api/axios";

export const loginApi = (data) => {
  return api.post("/auth/login", data);
};

export const registerApi = (data) => {
  return api.post("/auth/register", data);
};
