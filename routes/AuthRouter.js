import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

// Register a new user
router.post("/register", authController.register);

// Login an existing user
router.post("/login", authController.login);

export default router;
