import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// .get will fetch all users only "protect" and "admin" middleware is met.
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
// protect middleware will run every time this "profile" route is called
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
