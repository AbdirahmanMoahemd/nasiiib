import express from "express";
const router = express.Router();
import {
  registerUser,
  getUsers,
  registerUser2,
  authUser2,
  authUser,
} from "../controllers/userControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/login").post(authUser);
router.route("/register/app").post(registerUser2);
router.route("/app/login").post(authUser2);


export default router