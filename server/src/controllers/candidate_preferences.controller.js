import handleResponse from "./response_handler.js";
import {
    createCandidatePreferencesService, deleteCandidatePreferencesService,
    getCandidatePreferencesByUserIdService, updateCandidatePreferencesService
} from "../db/models/candidate_preferences.model.js";
import {getUserByIdService} from "../db/models/user.model.js";
import {AppError} from "../middleware/error_handler.js";

export const createCandidatePreferences = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const {industry, distance_km, preferred_role, start_date, apprenticeship_level, skills} = req.body;

        const preferences = await createCandidatePreferencesService(userId, industry, distance_km, preferred_role, start_date, apprenticeship_level, skills);
        if (!preferences)
            throw new AppError(404, "User not found.");
        else handleResponse(res, 201, "Candidate Preferences created successfully.", preferences);
    }
    catch (err) {
        next(err);
    }
}

export const getCandidatePreferences = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const preferences = await getCandidatePreferencesByUserIdService(userId);
        if (!preferences)
            throw new AppError(404, "Candidate Preferences not found.");
        else handleResponse(res, 200, "Candidate Preferences fetched successfully.", preferences);
    }
    catch (err) {
        next(err);
    }
}

export const updateCandidatePreferences = async (req, res, next) => {
    try {
        const {industry, distance_km, preferred_role, start_date, apprenticeship_level, skills} = req.body;
        const userId = req.params.userId;

        const preferences = await updateCandidatePreferencesService(userId, industry, distance_km, preferred_role, start_date, apprenticeship_level, skills);
        if (!preferences)
            throw new AppError(404, "Candidate Preferences not found.");
        else handleResponse(res, 200, "Candidate Preferences updated successfully.", preferences);
    }
    catch (err) {
        next(err);
    }
}

export const deleteCandidatePreferences = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const preferences = await deleteCandidatePreferencesService(userId);
        if (!preferences)
            throw new AppError(404, "Candidate Preferences not found.");
        else handleResponse(res, 200, "Candidate Preferences deleted successfully.", preferences);
    }
    catch (err) {
        next(err);
    }
}