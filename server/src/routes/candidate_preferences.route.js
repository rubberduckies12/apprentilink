import express from "express"
import {
    createCandidatePreferences,
    deleteCandidatePreferences,
    getCandidatePreferences,
    updateCandidatePreferences
} from "../controllers/candidate_preferences.controller.js";


const router = express.Router();

// CRUD API endpoints for Candidate Preferences objects
router.post("/user/:userId/preferences", createCandidatePreferences);
router.get("/user/:userId/preferences", getCandidatePreferences);
router.put("/user/:userId/preferences", updateCandidatePreferences);
router.delete("/user/:userId/preferences", deleteCandidatePreferences);

export default router;