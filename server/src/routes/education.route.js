import express from "express"
import {
    addUserEducation,
    deleteUserEducation,
    getUserEducation,
    updateUserEducation
} from "../controllers/education.controller.js";


const router = express.Router();

// TODO - Once schema is finalised, change to use new subjects matching system
router.post("/candidate/:userId/education", addUserEducation);
router.get("/candidate/:userId/education", getUserEducation);
router.put("/candidate/:userId/education/:educationId", updateUserEducation);
router.delete("/candidate/:userId/education/:educationId", deleteUserEducation);

export default router;