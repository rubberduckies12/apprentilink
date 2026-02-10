import pool from "../../db/config/db.config.js";
import {getUserByIdService} from "./user.model.js";
import {AppError} from "../../middleware/error_handler.js";
import validatePostcode from "../../utils/input_validation.util.js";


export const createCandidatePreferencesService = async (userId, industry, postcode, distance_km, preferred_role, start_date, apprenticeship_level) => {
    const user = await getUserByIdService(userId);
    if (!user)
        return null;
    else if (user.user_type !== 'CANDIDATE')
        throw new AppError(400, "Only Candidates can have preferences.");

    const existingPreferences = await getCandidatePreferencesByUserIdService(userId);
    if (existingPreferences)
        throw new AppError(400, "User already has Candidate Preferences. Cannot create.");

    if (postcode && !validatePostcode(postcode)) // Only validate postcode if it is present (postcode is optional, so null is allowed)
        throw new AppError(400, "Invalid postcode format.");

    const result = await pool.query("INSERT INTO candidate_preferences (user_id, industry, postcode, distance_km, preferred_role, start_date, apprenticeship_level) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [userId, industry, postcode, distance_km, preferred_role, start_date, apprenticeship_level]);
    return result.rows[0];
};

export const getCandidatePreferencesByUserIdService = async (userId) => {
    const user = await getUserByIdService(userId);
    if (!user)
        throw new AppError(404, "User not found.");

    const result = await pool.query("SELECT * FROM candidate_preferences WHERE user_id = $1", [userId]);
    return result.rows[0];
};

export const updateCandidatePreferencesService = async (userId, industry, postcode, distance_km, preferred_role, start_date, apprenticeship_level) => {
    const user = await getUserByIdService(userId);
    if (!user)
        throw new AppError(404, "User not found.");

    const preferences = await getCandidatePreferencesByUserIdService(userId);
    if (!preferences)
        return null;

    if (postcode && postcode !== preferences.postcode) {
        if (!validatePostcode(postcode))
            throw new AppError(400, "Invalid postcode format.");
    }

    const result = await pool.query("UPDATE candidate_preferences SET industry=$1, postcode=$2, distance_km=$3, preferred_role=$4, start_date=$5, apprenticeship_level=$6, updated_at=CURRENT_TIMESTAMP WHERE user_id=$7 RETURNING *",
        [industry, postcode, distance_km, preferred_role, start_date, apprenticeship_level, userId]);
    return result.rows[0];
};

export const deleteCandidatePreferencesService = async (userId) => {
    const user = await getUserByIdService(userId);
    if (!user)
        throw new AppError(404, "User not found.");

    const result = await pool.query("DELETE FROM candidate_preferences WHERE user_id = $1 RETURNING *",
        [userId]);
    return result.rows[0];
};