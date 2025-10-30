import express from "express";
import {register, login, refreshToken, verify} from "../controllers/authController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", authMiddleware, verify);
router.get("/refresh", authMiddleware, refreshToken);

export default router;
