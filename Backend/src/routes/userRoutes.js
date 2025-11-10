import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { updateUserRole } from "../controllers/userController.js";

const router = express.Router();

router.put("/role", authMiddleware, updateUserRole);

export default router;
