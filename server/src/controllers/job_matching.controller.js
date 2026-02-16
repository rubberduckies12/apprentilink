import handleResponse from "../utils/response_handler.js";
import {AppError} from "../middleware/error_handler.js";
import {
    getSavedUsersForJobService,
    getUserInterestedJobsService,
    getUserSavedJobsService,
    getUsersInterestedInJobService, shortlistUserForJobService, userInterestedInJobService,
    userSavesJobService
} from "../db/models/job_matching.model.js";

export const getUserSavedJobs = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const jobs = await getUserSavedJobsService(userId);
        if (!jobs)
            throw new AppError(404, "User not found.");
        else handleResponse(res, 200, "Jobs fetched successfully.", jobs);
    }
    catch (err) {
        next(err);
    }
}

export const getUserInterestedJobs = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const jobs = await getUserInterestedJobsService(userId);
        if (!jobs)
            throw new AppError(404, "User not found.");
        else handleResponse(res, 200, "Jobs fetched successfully.", jobs);
    }
    catch (err) {
        next(err);
    }
}

export const getSavedUsersForJob = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const users = await getSavedUsersForJobService(jobId);
        if (!users)
            throw new AppError(404, "Job not found.");
        else handleResponse(res, 200, "Users fetched successfully.", users);
    }
    catch (err) {
        next(err);
    }
}

export const getUsersInterestedInJob = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const users = await getUsersInterestedInJobService(jobId);
        if (!users)
            throw new AppError(404, "Job not found.");
        else handleResponse(res, 200, "Users fetched successfully.", users);
    }
    catch (err) {
        next(err);
    }
}

export const userSavesJob = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const jobId = req.params.jobId;
        const saved = req.body; // true/false to save/unsave the job

        // A 'users_interested' object should be returned
        const userJobObj = await userSavesJobService(userId, jobId, saved);
        if (!userJobObj)
            throw new AppError(500, "Unexpected error.");
        else handleResponse(res, 200, "Job saved by User successfully.", userJobObj);
    }
    catch (err) {
        next(err);
    }
}

export const userInterestedInJob = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const jobId = req.params.jobId;
        const interested = req.body;

        const userJobObj = await userInterestedInJobService(userId, jobId, interested);
        if (!userJobObj)
            throw new AppError(500, "Unexpected error.");
        else handleResponse(res, 200, "User successfully marked as interested in Job.", userJobObj);
    }
    catch (err) {
        next(err);
    }
}

export const shortlistUserForJob = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const jobId = req.params.jobId;

        const userJobObj = await shortlistUserForJobService(userId, jobId);
        if (!userJobObj)
            throw new AppError(500, "Unexpected error.");
        else handleResponse(res, 200, "User successfully shortlisted for Job.", userJobObj);
    }
    catch (err) {
        next(err);
    }
}