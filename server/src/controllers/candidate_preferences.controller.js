import handleResponse from "./response_handler.js";
import {
    createCandidatePreferencesService, deleteCandidatePreferencesService,
    getCandidatePreferencesByUserIdService, updateCandidatePreferencesService
} from "../db/models/candidate_preferences.model.js";

// TODO - Double check user exists before doing anything
export const createCandidatePreferences = async (req, res, next) => {
    const userId = req.params.userId;
    const {industry, distance_km, preferred_role, start_date, apprenticeship_level} = req.body;
    try {
        const newUser = await createCandidatePreferencesService(userId, industry, distance_km, preferred_role, start_date, apprenticeship_level);
        handleResponse(res, 201, "Candidate Preferences created successfully.", newUser);
    }
    catch (err) {
        next(err);
    }
}

export const getCandidatePreferences = async (req, res, next) => {
    try {
        const userId = req.params.userId; // Get ID from query parameters
        const preferences = await getCandidatePreferencesByUserIdService(userId);
        if (!preferences)
            handleResponse(res, 404, "Candidate Preferences not found.");
        else handleResponse(res, 200, "Candidate Preferences fetched successfully.", preferences);
    }
    catch (err) {
        next(err);
    }
}

export const updateCandidatePreferences = async (req, res, next) => {
    try {
        const {industry, distance_km, preferred_role, start_date, apprenticeship_level} = req.body;
        const userId = req.params.userId;
        const preferences = await updateCandidatePreferencesService(userId, industry, distance_km, preferred_role, start_date, apprenticeship_level);
        if (!preferences)
            handleResponse(res, 404, "Candidate Preferences not found.");
        else handleResponse(res, 200, "Candidate Preferences updated successfully.", preferences);
    }
    catch (err) {
        next(err);
    }
}

export const deleteCandidatePreferences = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const preferences = await deleteCandidatePreferencesService(id);
        if (!preferences)
            handleResponse(res, 404, "Candidate Preferences not found.");
        else handleResponse(res, 200, "Candidate Preferences deleted successfully.", preferences);
    }
    catch (err) {
        next(err);
    }
}