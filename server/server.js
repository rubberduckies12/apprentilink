import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./src/middleware/error_handler.js";
import userRoutes from "./src/routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // get from .env, or default to 3001

// Middleware
app.use(express.json());
app.use(cors);

// Error handling
app.use(errorHandler);

// Routes
app.use("/api", userRoutes);

// Run server
app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});