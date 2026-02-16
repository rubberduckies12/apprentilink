import express from "express";

const router = express.Router();

router.get("/jobs/users", getAllMatchRecords);
router.post("/jobs/:jobId/users/:userId/match", createMatchRecord);
router.delete("/jobs/:jobId/users/:userId/match", deleteMatchRecord);