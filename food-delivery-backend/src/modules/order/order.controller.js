import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import orderService from "./order.service.js";


const placeOrder = asyncHandler(async (req, res) => {
  const result = await orderService.placeOrder({
    userId: req.user.id,
    ...req.body,
  });

  res
    .status(201)
    .json(new ApiResponse(201, result, "Order placed successfully"));
});


const getMyOrders = asyncHandler(async (req, res) => {
  const result = await orderService.getUserOrders(
    req.user.id,
    req.query
  );

  res
    .status(200)
    .json(new ApiResponse(200, result, "Orders fetched"));
});


const getAllOrders = asyncHandler(async (req, res) => {
  const result = await orderService.getAllOrders(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, result, "All orders fetched"));
});


const getOrderById = asyncHandler(async (req, res) => {
  const result = await orderService.getOrderById(
    req.params.id,
    req.user
  );

  res
    .status(200)
    .json(new ApiResponse(200, result, "Order fetched"));
});


const updateOrderStatus = asyncHandler(async (req, res) => {
  const result = await orderService.updateOrderStatus(
    req.params.id,
    req.body.status
  );

  res
    .status(200)
    .json(new ApiResponse(200, result, "Order status updated"));
});

export {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
