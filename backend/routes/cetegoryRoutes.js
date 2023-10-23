import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories2,
} from "../controllers/categoryController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCategories).post(protect, admin, createCategory);
router.route('/app/categories').get(getCategories2)

router
  .route("/:id")
  .get(getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory);

export default router;
