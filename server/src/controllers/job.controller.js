import handleResponse from "../utils/response_handler.js";
import {AppError} from "../middleware/error_handler.js";
import {
    createJobService, deleteJobService,
    getAllJobsService,
    getJobByIdService,
    getJobsByCompanyIdService, updateJobService
} from "../db/models/job.model.js";

export const createJob = async (req, res, next) => {
    try {
        const companyId = req.params.companyId;
        const {job_title, postcode, description, salary, field, apprenticeship_level, desired_education_level, start_date, match_message, close_message} = req.body;

        if (!job_title || !description)
            throw new AppError(400, "Job Title and Description are required.");
        else if (!postcode)
            throw new AppError(400, "Postcode for Job location is required.");

        const job = await createJobService(companyId, job_title, postcode, description, salary, field, apprenticeship_level, desired_education_level, start_date, match_message, close_message);
        if (!job)
            throw new AppError(404, "Company not found.");
        else handleResponse(res, 201, "Job created successfully.", job);
    }
    catch (err) {
        next(err);
    }
}

export const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await getAllJobsService();
        handleResponse(res, 200, "Jobs fetched successfully.", jobs);
    }
    catch (err) {
        next(err);
    }
}

export const getJobsByCompanyId = async (req, res, next) => {
    try {
        const companyId = req.params.companyId;
        const jobs = await getJobsByCompanyIdService(companyId);
        if (!jobs)
            throw new AppError(404, "Company not found.");
        else handleResponse(res, 200, "Jobs fetched successfully.", jobs);
    }
    catch (err) {
        next(err);
    }
}

export const getJobById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const job = await getJobByIdService(id);
        if (!job)
            throw new AppError(404, "Job not found.");
        else handleResponse(res, 200, "Job fetched successfully.", job);
    }
    catch (err) {
        next(err);
    }
}

export const updateJob = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {job_title, postcode, description, salary, field, apprenticeship_level, desired_education_level, start_date, match_message, close_message} = req.body;

        if (!job_title || !description)
            throw new AppError(400, "Job Title and Description are required.");
        else if (!postcode)
            throw new AppError(400, "Postcode for Job location is required.");

        const job = await updateJobService(id, job_title, postcode, description, salary, field, apprenticeship_level, desired_education_level, start_date, match_message, close_message);
        if (!job)
            throw new AppError(404, "Job not found.");
        else handleResponse(res, 200, "Job updated successfully.", job);
    }
    catch (err) {
        next(err);
    }
}

export const deleteJob = async (req, res, next) => {
    try {
        const id = req.params.id;
        const job = await deleteJobService(id);
        if (!job)
            throw new AppError(404, "Job not found.");
        else handleResponse(res, 200, "Job deleted successfully.", job);
    }
    catch (err) {
        next(err);
    }
}