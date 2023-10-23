import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getByAdminProducts,
  getProductById,
  getProducts,
  getProductsByApp,
  updateProduct,
} from "../controllers/productsController.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/admin/products").get(protect, admin, getByAdminProducts);
router.route("/app/products").get(getProductsByApp);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);


  export default router