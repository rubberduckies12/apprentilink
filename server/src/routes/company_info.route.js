import express from "express"
import {
    createCompanyInfo,
    deleteCompanyInfo,
    getCompanyInfo,
    updateCompanyInfo
} from "../controllers/company_info.controller.js";


const router = express.Router();

// CRUD API endpoints for Candidate Preferences objects
router.post("/company/:userId", createCompanyInfo);
router.get("/company/:userId", getCompanyInfo);
router.put("/company/:userId", updateCompanyInfo);
router.delete("/company/:userId", deleteCompanyInfo);

export default router;