import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/posts.controller";
import verifyToken from "../middleware/auth";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userID/posts", verifyToken, getUserPosts);

// UPDATE
router.patch("/:id/like", verifyToken, likePost);

export default router;
