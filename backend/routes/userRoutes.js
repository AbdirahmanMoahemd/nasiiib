import express from "express";
const router = express.Router();
import {
  registerUser,
  getUsers,
  registerUser2,
  authUser2,
  authUser,
  getUserProfileById,
  updateProfile2,
  updateUserPasswordApp,
  generateOtp,
  generateSMS,
} from "../controllers/userControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/generate-otp").post(generateOtp);
router.route("/generate-sms").post(generateSMS);
router.route("/login").post(authUser);
router.route("/register/app").post(registerUser2);
router.route("/app/login").post(authUser2);
router.route("/profile/:id").post(protect, getUserProfileById);
router.route("/app/profile/:id").put(protect, updateProfile2);
router.route("/app/password/:id").put(protect, updateUserPasswordApp);
export default router;
