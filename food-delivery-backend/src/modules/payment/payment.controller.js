import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import paymentService from "./payment.service.js";

const createPayment = asyncHandler(async (req, res) => {
  const result = await paymentService.createPayment({
    userId: req.user.id,       
    orderId: req.body.orderId,
    method: req.body.method,
  });

  res
    .status(201)
    .json(new ApiResponse(201, result, "Payment created"));
});

const updatePaymentStatus = asyncHandler(async (req, res) => {
  const result = await paymentService.updatePaymentStatus(
    req.params.id,
    req.body.status
  );

  res
    .status(200)
    .json(new ApiResponse(200, result, "Payment status updated"));
});

export { createPayment, updatePaymentStatus };
