import api from "../../services/api/axios";

// export const fetchAllMenusApi = () => {
//   return api.get("/menu");
// };

export const createMenuApi = (data) => {
  return api.post("/menu", data);
};

export const updateMenuApi = (id, data) => {
  return api.put(`/menu/${id}`, data);
};

export const deleteMenuApi = (id) => {
  return api.delete(`/menu/${id}`);
};

export const fetchAllMenusApi = () => {
  return api.get("/menu/admin");
};
