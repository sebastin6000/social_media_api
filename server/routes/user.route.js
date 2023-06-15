import express from "express";

// IMPORTING THE CONTROLLERS FOR THE ROUTES
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.contoller.js";

import { verifyToken } from "../middleware/auth.js";

export const userRouter = express.Router();

// READ
userRouter.get("/:id", verifyToken, getUser);
userRouter.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
userRouter.patch("/:id/friendId", verifyToken, addRemoveFriend);
