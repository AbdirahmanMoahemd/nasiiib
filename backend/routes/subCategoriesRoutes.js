import express from "express";
import {
  getSubCategories,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategories2,
  getSubCategoryByCategory,
} from "../controllers/subCategoryController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getSubCategories).post(protect, admin, createSubCategory);
router.route('/all').get(getSubCategories2)
router.route('/search').post(getSubCategoryByCategory)


router
  .route("/:id")
  .get(getSubCategoryById)
  .delete(protect, admin, deleteSubCategory)
  .put(protect, admin, updateSubCategory);

export default router;
