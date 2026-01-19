import express from "express"

const router = express.Router();

// CRUD API endpoints for User objects
router.get("/user");
router.post("/user");
router.get("/user/:id");
router.put("/user/:id");
router.delete("/user/:id");

export default router;