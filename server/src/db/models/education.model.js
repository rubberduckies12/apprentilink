import pool from "../config/db.config.js";
import {AppError} from "../../middleware/error_handler.js";
import {getUserByIdService} from "./user.model.js";

export const createEducationService = async (userId, education_level, subjects) => {
    const user = await getUserByIdService(userId);
    if (!user)
        throw new AppError(404, "User not found.");
    else if (user.user_type !== 'CANDIDATE')
        throw new AppError(400, "Only Candidates can have education.");

    const result = await pool.query("INSERT INTO education (user_id, education_level, subjects) VALUES ($1, $2, $3) RETURNING *",
        [userId, education_level, subjects]);
    return result.rows[0];
};

export const getAllEducationForUserIdService = async (userId) => {
    const user = await getUserByIdService(userId);
    if (!user)
        throw new AppError(404, "User not found.");

    const result = await pool.query("SELECT * FROM education WHERE user_id=$1 ORDER BY id", [userId]);
    return result.rows;
};

export const updateEducationService = async (userId, educationId, education_level, subjects) => {
    const user = await getUserByIdService(userId);
    if (!user)
        throw new AppError(404, "User not found.");

    const result = await pool.query("UPDATE education SET education_level=$1, subjects=$2, updated_at=CURRENT_TIMESTAMP WHERE user_id=$3 AND id=$4 RETURNING *",
        [education_level, subjects, userId, educationId]);
    return result.rows[0];
};

export const deleteEducationService = async (userId, educationId) => {
    const user = await getUserByIdService(userId);
    if (!user)
        throw new AppError(404, "User not found.");

    const result = await pool.query("DELETE FROM education WHERE user_id=$1 AND id=$2 RETURNING *",
        [userId, educationId]);
    return result.rows[0];
};