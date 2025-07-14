import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { userDetails } from "../controllers/auth.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login",login);
router.post("/logout",logout);
router.post("/signup",signup);
router.get("/me",userDetails);

export default router;