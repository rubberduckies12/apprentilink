import express from "express";

const router = express.router();

router.get("/job/users", getAllJobMatches);
router.get("/user/:userId/jobs/saved", getUserSavedJobs);
router.get("/user/:userId/jobs/interested", getUserInterestedJobs);
router.get("/job/:jobId/users/saved", getSavedUsersForJob);
router.get("/job/:jobId/users/interested", getUsersInterestedInJob);
router.post("/user/:userId/jobs/:jobId/save", userSavesJob);
router.post("/user/:userId/jobs/:jobId/interested", userInterestedInJob);
router.post("/job/:jobId/users/:userId/shortlist", shortlistUserForJob); // Must have some kind of authentication, to prevent users shortlisting themselves

export default router;