import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrders,
  addOrderItems2,
} from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/app").post(protect, addOrderItems2)


export default router;
