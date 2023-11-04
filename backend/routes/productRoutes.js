import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getByAdminProducts,
  getDiscountedProductsByApp,
  getNewProductsByApp,
  getProductById,
  getProducts,
  getProductsByApp,
  getProductsByCategoryByApp,
  getProductsByname,
  getTopProductsByApp,
  updateProduct,
} from "../controllers/productsController.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/admin/products").get(protect, admin, getByAdminProducts);
router.route("/app/products").get(getProductsByApp);
router.route("/app/category").post(getProductsByCategoryByApp);
router.route("/app/top").get(getTopProductsByApp);
router.route("/app/new").get(getNewProductsByApp);
router.route("/app/discounted").get(getDiscountedProductsByApp);
router.route("/search/:name").get(getProductsByname);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);


  export default router