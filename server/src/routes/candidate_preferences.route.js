import express from "express"
import {
    createCandidatePreferences,
    deleteCandidatePreferences,
    getCandidatePreferences,
    updateCandidatePreferences
} from "../controllers/candidate_preferences.controller.js";


const router = express.Router();

// CRUD API endpoints for Candidate Preferences objects
router.post("/candidate/:userId", createCandidatePreferences);
router.get("/candidate/:userId", getCandidatePreferences);
router.put("/candidate/:userId", updateCandidatePreferences);
router.delete("/candidate/:userId", deleteCandidatePreferences);

export default router;