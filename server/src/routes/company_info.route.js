import express from "express"


const router = express.Router();

// CRUD API endpoints for Candidate Preferences objects
router.post("/company/:userId", createCompanyInfo);
router.get("/company/:userId", getCompanyInfo);
router.put("/company/:userId", updateCompanyInfo);
router.delete("/company/:userId", deleteCompanyInfo);

export default router;