import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import adminService from "./admin.service.js";

const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getDashboardStats();

  res
    .status(200)
    .json(new ApiResponse(200, stats, "Dashboard stats fetched"));
});

export { getDashboardStats };