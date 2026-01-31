import { Router } from "express";
import roleMiddleware from "../../middlewares/role.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

import {
  createMenuItem,
  getMenu,
  updateMenuItem,
  deleteMenuItem,
  getAllMenusAdmin,
} from "./menu.controller.js";

const router = Router();

// USER menu
router.get("/", getMenu);

// ADMIN menu (MUST be before :id)
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllMenusAdmin
);

// ADMIN actions
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createMenuItem
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateMenuItem
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteMenuItem
);

export default router;
