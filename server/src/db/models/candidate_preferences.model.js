import pool from "../../db/config/db.config.js";


// TODO - A user must only have 1 preferences attached to it. Check what happens when trying to add a 2nd one
export const createCandidatePreferencesService = async (userId, industry, distance_km, preferred_role, start_date, apprenticeship_level) => {
    const result = await pool.query("INSERT INTO candidate_preferences (user_id, industry, distance_km, preferred_role, start_date, apprenticeship_level) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [userId, industry, distance_km, preferred_role, start_date, apprenticeship_level]);
    return result.rows[0];
};

export const getCandidatePreferencesByUserIdService = async (userId) => {
    const result = await pool.query("SELECT * FROM candidate_preferences WHERE user_id = $1", [userId]);
    return result.rows[0];
};

export const updateCandidatePreferencesService = async (userId, industry, distance_km, preferred_role, start_date, apprenticeship_level) => {
    const result = await pool.query("UPDATE candidate_preferences SET industry=$1, distance_km=$2, preferred_role=$3, start_date=$4, apprenticeship_level=$5 WHERE user_id=$6 RETURNING *",
        [industry, distance_km, preferred_role, start_date, apprenticeship_level, userId]);
    return result.rows[0];
};

export const deleteCandidatePreferencesService = async (userId) => {
    const result = await pool.query("DELETE FROM candidate_preferences WHERE user_id = $1 RETURNING *",
        [userId]);
    return result.rows[0];
};