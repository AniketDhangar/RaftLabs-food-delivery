import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import menuService from "./menu.service.js";


const createMenuItem = asyncHandler(async (req, res) => {
  const result = await menuService.createMenuItem(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, result, "Menu item created"));
});


const getMenu = asyncHandler(async (req, res) => {
  const result = await menuService.getAvailableMenu(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, result, "Menu fetched"));
});


const getAllMenusAdmin = asyncHandler(async (req, res) => {
  const result = await menuService.getAllMenusAdmin(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, result, "All menus fetched"));
});


const updateMenuItem = asyncHandler(async (req, res) => {
  const result = await menuService.updateMenuItem(
    req.params.id,
    req.body
  );

  res
    .status(200)
    .json(new ApiResponse(200, result, "Menu item updated"));
});


const deleteMenuItem = asyncHandler(async (req, res) => {
  const result = await menuService.deleteMenuItem(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, result, "Menu item deleted"));
});

export {
  createMenuItem,
  getMenu,
  getAllMenusAdmin,
  updateMenuItem,
  deleteMenuItem,
};
