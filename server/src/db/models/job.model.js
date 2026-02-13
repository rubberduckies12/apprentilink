import pool from "../../db/config/db.config.js";
import {AppError} from "../../middleware/error_handler.js";
import {getCompanyInfoByIdService} from "./company_info.model.js";
import validatePostcode from "../../utils/input_validation.util.js";

export const createJobService = async (companyId, job_title, postcode, description, salary, field, apprenticeship_level, desired_education_level, start_date, match_message, close_message) => {
    const company = getCompanyInfoByIdService(companyId);
    if (!company)
        return null;

    const existingJobs = await getJobsByCompanyIdService(companyId);
    if (existingJobs.some(job => job.job_title === job_title))
        throw new AppError(400, "A job with this title has already been posted by this company. Cannot create.");

    if (!validatePostcode(postcode))
        throw new AppError(400, "Invalid postcode format.");

    const result = pool.query("INSERT INTO jobs (company_id, job_title, postcode, description, salary, field, apprenticeship_level, desired_education_level, start_date, match_message, close_message) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
        [companyId, job_title, postcode, description, salary, field, apprenticeship_level, desired_education_level, start_date, match_message, close_message]);
    return result.rows[0];
};

export const getAllJobsService = async () => {
    const result = pool.query("SELECT * FROM jobs ORDER BY id");
    return result.rows;
};

export const getJobsByCompanyIdService = async (companyId) => {
    const company = getCompanyInfoByIdService(companyId);
    if (!company)
        return null;

    const result = pool.query("SELECT * FROM jobs WHERE company_id = $1", [companyId]);
    return result.rows;
}

export const getJobByIdService = async (id) => {
    const result = pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
    return result.rows[0];
}

export const updateJobService = async (id, job_title, postcode, description, salary, field, apprenticeship_level, desired_education_level, start_date, match_message, close_message) => {
    const job = getJobByIdService(id);
    if (!job)
        return null;

    const existingJobs = await getJobsByCompanyIdService(companyId);
    if (existingJobs.some(job => job.job_title === job_title))
        throw new AppError(400, "A job with this title has already been posted by this company. Cannot create.");

    if (postcode !== preferences.postcode) {
        if (!validatePostcode(postcode))
            throw new AppError(400, "Invalid postcode format.");
    }

    const result = pool.query("UPDATE jobs SET job_title=$1, postcode=$2, description=$3, salary=$4, field=$5, apprenticeship_level=$6, desired_education_level=$7, start_date=$8, match_message=$9, close_message=$10 WHERE id=$11 RETURNING *",
        [job_title, postcode, description, salary, field, apprenticeship_level, desired_education_level, start_date, match_message, close_message, id]);
    return result.rows[0];
}

export const deleteJobService = async (id) => {
    const job = getJobByIdService(id);
    if (!job)
        return null;

    const result = pool.query("DELETE FROM jobs WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
}