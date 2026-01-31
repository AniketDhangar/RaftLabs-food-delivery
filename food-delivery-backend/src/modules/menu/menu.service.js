import ApiError from "../../utils/ApiError.js";
import menuRepository from "./menu.repository.js";

const createMenuItem = async (data) => {
  return menuRepository.createMenuItem(data);
};

const getAvailableMenu = async (query) => {
  return menuRepository.getPaginatedMenu(query);
};

const getAllMenusAdmin = async (query) => {
  return menuRepository.getAllMenuAdmin(query);
};

const updateMenuItem = async (id, data) => {
  const menu = await menuRepository.updateMenuItem(id, data);

  if (!menu) {
    throw new ApiError(404, "Menu not found");
  }

  return menu;
};

const deleteMenuItem = async (id) => {
  const menu = await menuRepository.deleteMenuItem(id);

  if (!menu) {
    throw new ApiError(404, "Menu not found");
  }

  return menu;
};

export default {
  createMenuItem,
  getAvailableMenu,
  getAllMenusAdmin,   
  updateMenuItem,
  deleteMenuItem,
};
