import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrders,
  addOrderItems2,
  getMyOrdersApp,
  getOrderById
} from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/app").post(protect, addOrderItems2);
router.route("/app/myorders/:id").get(protect, getMyOrdersApp);
router.route("/app/details/:id").get(protect, getOrderById);

export default router;
