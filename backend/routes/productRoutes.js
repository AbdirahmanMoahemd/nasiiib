import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getByAdminProducts,
  getProductById,
  getProducts,
  getProductsByApp,
  getProductsByCategoryByApp,
  getProductsByname,
  updateProduct,
} from "../controllers/productsController.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/admin/products").get(protect, admin, getByAdminProducts);
router.route("/app/products").get(getProductsByApp);
router.route("/app/category").get(getProductsByCategoryByApp);
router.route("/search/:name").get(getProductsByname);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);


  export default router