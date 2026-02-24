import pool from "../../db/config/db.config.js";

// This is the only stats service which actually has an endpoint - the rest are used in the backend only, by other endpoints
export const getAppStatsService = async () => {
    const result = await pool.query("SELECT * FROM app_stats");
    return result.rows[0];
}