import express from "express"
import {
    createCompanyInfo,
    deleteCompanyInfo,
    getCompanyInfoById,
    getCompanyInfoByUserId,
    updateCompanyInfo
} from "../controllers/company_info.controller.js";


const router = express.Router();

// CRUD API endpoints for Candidate Preferences objects
router.post("/company/:userId", createCompanyInfo);
router.get("/company/:id", getCompanyInfoById);
router.get("/company/user/:userId", getCompanyInfoByUserId)
router.put("/company/:userId", updateCompanyInfo);
router.delete("/company/:userId", deleteCompanyInfo);

export default router;