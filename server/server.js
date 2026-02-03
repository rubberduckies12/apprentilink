import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./src/middleware/error_handler.js";
import userRoutes from "./src/routes/user.route.js";
import candidatePreferencesRoutes from './src/routes/candidate_preferences.route.js';
import educationRoutes from "./src/routes/education.route.js";
import companyInfoRoutes from "./src/routes/company_info.route.js";
import { initializeDatabase } from './src/db/config/db.config.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // get from .env, or default to 3001

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);
app.use("/api", candidatePreferencesRoutes);
app.use("/api", educationRoutes);
app.use("/api", companyInfoRoutes);

// Error handling
app.use(errorHandler);

// Run server
async function startServer() {
   try {
      await initializeDatabase();
      app.listen(port, () => {
         console.log(`Server running on port ${port}`);
      });
   }
   catch (err) {
      console.error("Failed to start server: ", err);
      process.exit(1);
   }
}

startServer();
