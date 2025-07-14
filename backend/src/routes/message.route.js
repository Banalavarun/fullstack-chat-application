import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/sendMessage", authMiddleware, sendMessage);
router.get("/getMessages/:toUserId", authMiddleware, getMessages);

export default router;