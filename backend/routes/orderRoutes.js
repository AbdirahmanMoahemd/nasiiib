import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrders,
  addOrderItems2,
  getMyOrdersApp
} from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/app").post(protect, addOrderItems2)
router.route("/app/myorders").post(protect, getMyOrdersApp)


export default router;
