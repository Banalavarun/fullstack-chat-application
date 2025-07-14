import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriends,
    getFriendRequests,
    searchUsers
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/sendFriendRequest", authMiddleware, sendFriendRequest);
router.post("/acceptFriendRequest", authMiddleware, acceptFriendRequest);
router.post("/rejectFriendRequest", authMiddleware, rejectFriendRequest);
router.get("/getFriends", authMiddleware, getFriends);
router.get("/getFriendRequests", authMiddleware, getFriendRequests);
router.get("/search", authMiddleware, searchUsers);

export default router;