import express from "express";

const router = express.router();

// Routes for generic app-related things
router.get("/stats", getAppStats);

export default router;