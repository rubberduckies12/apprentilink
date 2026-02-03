import express from "express"
import {
    addUserEducation,
    deleteUserEducation,
    getUserEducation,
    updateUserEducation
} from "../controllers/education.controller.js";


const router = express.Router();

// CRUD API endpoints for Candidate Preferences objects (using User IDs because they are One-to-One with user accounts)
router.post("/candidate/:userId/education", addUserEducation);
router.get("/candidate/:userId/education", getUserEducation);
router.put("/candidate/:userId/education/:educationId", updateUserEducation);
router.delete("/candidate/:userId/education/:educationId", deleteUserEducation);

export default router;