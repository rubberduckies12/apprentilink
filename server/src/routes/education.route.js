import express from "express"
import {
    addUserEducation,
    deleteUserEducation,
    getUserEducation,
    updateUserEducation
} from "../controllers/education.controller.js";


const router = express.Router();

// CRUD API endpoints for Candidate Preferences objects
router.post("/user/:userId/education", addUserEducation);
router.get("/user/:userId/education", getUserEducation);
router.put("/user/:userId/education/:educationId", updateUserEducation);
router.delete("/user/:userId/education/:educationId", deleteUserEducation);

export default router;