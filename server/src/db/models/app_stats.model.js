import pool from "../../db/config/db.config.js";

// This is the only stats service which actually has an endpoint - the rest are used in the backend only, by other endpoints
export const getAppStatsService = async () => {
    const result = await pool.query("SELECT * FROM app_stats");
    return result.rows[0];
}

/*
    INCREMENTING SERVICES
 */
export const incrementAllTimeCandidatesCount = async () => {
    const count = (await getAppStatsService()).candidates_count_all_time;
    const result = await pool.query("UPDATE app_stats SET candidates_count_all_time = $1 RETURNING candidates_count_all_time",
        [count + 1]);
    return result.rows[0].candidates_count_all_time; // Return the updated count
}

export const incrementAllTimeCompaniesCount = async () => {
    const count = (await getAppStatsService()).companies_count_all_time;
    const result = await pool.query("UPDATE app_stats SET companies_count_all_time = $1 RETURNING companies_count_all_time",
        [count + 1]);
    return result.rows[0].companies_count_all_time; // Return the updated count
}

export const incrementAllTimeMatchesCount = async () => {
    const count = (await getAppStatsService()).matches_made_all_time;
    const result = await pool.query("UPDATE app_stats SET matches_made_all_time = $1 RETURNING matches_made_all_time",
        [count + 1]);
    return result.rows[0].matches_made_all_time;
}

export const incrementAllTimeJobsCount = async () => {
    const count = (await getAppStatsService()).jobs_posted_all_time;
    const result = await pool.query("UPDATE app_stats SET jobs_posted_all_time = $1 RETURNING jobs_posted_all_time",
        [count + 1]);
    return result.rows[0].jobs_posted_all_time;
}