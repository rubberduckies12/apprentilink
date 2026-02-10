import express from "express";
import {
    createJob,
    deleteJob,
    getAllJobs,
    getJobById,
    getJobsByCompanyId,
    updateJob
} from "../controllers/job.controller.js";

const router = express.router();

router.post("/job/:companyId", createJob);
router.get("/job", getAllJobs);
router.get("/company/:companyId/jobs", getJobsByCompanyId);
router.get("/job/:id", getJobById);
router.put("/job/:id", updateJob);
router.delete("/job/:id", deleteJob);

export default router;