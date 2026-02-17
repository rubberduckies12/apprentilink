import express from "express";
import {
    getSavedUsersForJob,
    getUserInterestedJobs,
    getUserSavedJobs,
    getUsersInterestedInJob,
    shortlistUserForJob,
    userInterestedInJob,
    userSavesJob
} from "../controllers/job_matching.controller.js";

const router = express.Router();

router.get("/user/:userId/jobs/saved", getUserSavedJobs);
router.get("/user/:userId/jobs/interested", getUserInterestedJobs);
router.get("/job/:jobId/users/saved", getSavedUsersForJob);
router.get("/job/:jobId/users/interested", getUsersInterestedInJob);
router.post("/user/:userId/job/:jobId/save", userSavesJob);
router.post("/user/:userId/job/:jobId/interested", userInterestedInJob);
router.post("/job/:jobId/user/:userId/shortlist", shortlistUserForJob);

export default router;