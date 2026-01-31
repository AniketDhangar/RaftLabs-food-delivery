import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";

import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "./order.controller.js";

import {
  validate,
  placeOrderSchema,
  updateOrderStatusSchema,
} from "./order.validation.js";

const router = Router();


router.post(
  "/",
  authMiddleware,
  validate(placeOrderSchema),
  placeOrder
);

router.get("/my", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById);


router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllOrders
);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(updateOrderStatusSchema),
  updateOrderStatus
);

export default router;
