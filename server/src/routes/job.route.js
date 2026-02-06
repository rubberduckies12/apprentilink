import express from "express";

const router = express.router();

router.get("/job", getAllJobs);
router.post("/job", createJob);
router.get("/company/:companyId/jobs", getJobsByCompanyId);
router.get("/job/:id", getJobById);
router.put("/job/:id", updateJob);
router.delete("/job/:id", deleteJob);

export default router;