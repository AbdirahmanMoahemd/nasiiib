import express from "express";
import {
  addToCart,
  addToWishlist,
  deleteCart,
  removeCartItem,
  removeWishlistItem,
} from "../controllers/cartController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/add-to-cart").post(protect, addToCart);
router.route("/add-to-wishlist").post(protect, addToWishlist);
router.route("/remove-cartitem").delete(protect, removeCartItem);
router.route("/remove-wishlistItem").delete(protect, removeWishlistItem);
router.route("/remove-from-cart/:id").delete(protect, deleteCart);

export default router;