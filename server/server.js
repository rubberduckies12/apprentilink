import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // get from .env, or default to 3001

// Middleware
app.use(express.json());
app.use(cors);

// Error handling
// TODO

// Routes
// TODO

// Run server
app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});