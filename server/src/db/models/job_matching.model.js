import pool from "../config/db.config.js";
import {AppError} from "../../middleware/error_handler.js";
import {getUserByIdService} from "./user.model.js";
import {getJobByIdService} from "./job.model.js";

export const getUserSavedJobsService = async (userId) => {
    const user = await getUserByIdService(userId);
    if (!user)
        return null;

    const result = await pool.query("SELECT * FROM jobs JOIN users_interested ON jobs.id = users_interested.job_id WHERE users_interested.user_id = $1 AND users_interested.user_saved = true", [userId]);
    return result.rows;
};

export const getUserInterestedJobsService = async (userId) => {
    const user = await getUserByIdService(userId);
    if (!user)
        return null;

    const result = await pool.query("SELECT * FROM jobs JOIN users_interested ON jobs.id = users_interested.job_id WHERE users_interested.user_id = $1 AND users_interested.user_interested = true", [userId]);
    return result.rows;
};

export const getSavedUsersForJobService = async (jobId) => {
    const job = await getJobByIdService(jobId);
    if (!job)
        return null;

    const result = await pool.query("SELECT * FROM users JOIN users_interested ON users.id = users_interested.user_id WHERE users_interested.job_id = $1 AND users_interested.user_saved = true", [jobId]);
    return result.rows;
}

export const getUsersInterestedInJobService = async (jobId) => {
    const job = await getJobByIdService(jobId);
    if (!job)
        return null;

    const result = await pool.query("SELECT * FROM users JOIN users_interested ON users.id = users_interested.user_id WHERE users_interested.job_id = $1 AND users_interested.user_interested = true", [jobId]);
    return result.rows;
}

const getUserJobMatchingObject = async (userId, jobId) => {
    const user = await getUserByIdService(userId);
    if (!user)
        throw new AppError(404, "User not found.");

    const job = await getJobByIdService(jobId);
    if (!job)
        throw new AppError(404, "Job not found.");

    const result = await pool.query("SELECT * FROM users_interested WHERE user_id = $1 AND job_id = $2",
        [userId, jobId]);
    return result.rows[0];
}

export const userSavesJobService = async (userId, jobId, saved) => {
    const userJobObj = await getUserJobMatchingObject(userId, jobId);

    let result;
    if (userJobObj) { // If the user has already interacted with this job, update the existing 'users_interested' object
        result = await pool.query("UPDATE users_interested SET user_saved = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND job_id = $3 RETURNING *",
            [saved, userId, jobId]);
    }
    else { // Otherwise create a new 'users_interested' object
        result = await pool.query("INSERT INTO users_interested (user_id, job_id, user_saved) VALUES ($1, $2, $3) RETURNING *",
            [userId, jobId, saved]);
    }

    return result.rows[0];
}

export const userInterestedInJobService = async (userId, jobId, interested) => {
    const userJobObj = await getUserJobMatchingObject(userId, jobId);

    let result;
    if (userJobObj) { // If the user has already interacted with this job, update the existing 'users_interested' object
        result = await pool.query("UPDATE users_interested SET user_interested = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND job_id = $3 RETURNING *",
            [interested, userId, jobId]);
    }
    else { // Otherwise create a new 'users_interested' object
        result = await pool.query("INSERT INTO users_interested (user_id, job_id, user_interested) VALUES ($1, $2, $3) RETURNING *",
            [userId, jobId, interested]);
    }

    return result.rows[0];
}

export const shortlistUserForJobService = async (userId, jobId) => {
    const userJobObj = await getUserJobMatchingObject(userId, jobId);

    // Can only shortlist users who have marked themselves as interested
    if (!userJobObj || !userJobObj.user_interested)
        throw new AppError(400, "User is not interested in this Job.");

    const job = await getJobByIdService(jobId);

    // TODO - Must check the account which has activated this endpoint is of type COMPANY or ADMIN, to avoid users shortlisting themselves

    // TODO - These two queries should be done in 1 transaction, to ensure that a user cannot be matched without a record being made
    const result = await pool.query("UPDATE users_interested SET shortlisted = true, updated_at = CURRENT_TIMESTAMP WHERE user_id = $1 AND job_id = $2 RETURNING *",
            [userId, jobId]);

    if (result.rows.length > 0) {
        // When a company shortlists a user, a match_record object must be created for GDPR purposes
        await pool.query("INSERT INTO match_records (user_id, company_id, job_title) VALUES ($1, $2, $3)",
            [userId, job.company_id, job.job_title]);

        return result.rows[0];
    }
    else return null;
}

