import express from "express"
import {createUser, deleteUser, getAllUsers, getUserById, updateUser} from "../controllers/user.controller.js";

const router = express.Router();

// CRUD API endpoints for User objects
router.get("/user", getAllUsers);
router.post("/user", createUser);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;