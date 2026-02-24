import express from "express";
import {getAppStats} from "../controllers/generic.controller.js";

const router = express.Router();

// Routes for generic app-related things
router.get("/stats", getAppStats);

export default router;