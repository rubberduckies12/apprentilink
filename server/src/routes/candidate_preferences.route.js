import express from "express"
import {
    createCandidatePreferences,
    deleteCandidatePreferences,
    getCandidatePreferences,
    updateCandidatePreferences
} from "../controllers/candidate_preferences.controller.js";


const router = express.Router();

// CRUD API endpoints for Candidate Preferences objects
router.post("/preferences/:userId", createCandidatePreferences);
router.get("/preferences/:userId", getCandidatePreferences);
router.put("/preferences/:userId", updateCandidatePreferences);
router.delete("/preferences/:userId", deleteCandidatePreferences);

export default router;