import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import menuRoutes from "../modules/menu/menu.routes.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import orderRoutes from "../modules/order/order.routes.js";
import paymentRoutes from "../modules/payment/payment.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";

const router = Router();


router.use("/auth", authRoutes);


router.use("/menu",  menuRoutes);
router.use("/orders", authMiddleware, orderRoutes);
router.use("/payments", authMiddleware, paymentRoutes);

router.use("/admin", adminRoutes);
export default router;
