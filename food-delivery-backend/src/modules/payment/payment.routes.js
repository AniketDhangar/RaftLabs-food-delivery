import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";

import {
  createPayment,
  updatePaymentStatus,
} from "./payment.controller.js";

import {
  validate,
  createPaymentSchema,
  updatePaymentStatusSchema,
} from "./payment.validation.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createPaymentSchema),
  createPayment
);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(updatePaymentStatusSchema),
  updatePaymentStatus
);

export default router;
