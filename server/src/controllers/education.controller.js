import handleResponse from "./response_handler.js";
import {AppError} from "../middleware/error_handler.js";
import {
    createEducationService, deleteEducationService,
    getAllEducationForUserIdService,
    updateEducationService
} from "../db/models/education.model.js";

export const addUserEducation = async (req, res, next) => {
    const {education_level, subjects} = req.body;
    const userId = req.params.userId;

    if (!education_level || !subjects)
        throw new AppError(400, "Education level and Subjects are required.");

    try {
        const newEducation = await createEducationService(userId, education_level, subjects);
        handleResponse(res, 201, "Education added successfully.", newEducation);
    }
    catch (err) {
        next(err);
    }
}

export const getUserEducation = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const educationEntries = await getAllEducationForUserIdService(userId);
        handleResponse(res, 200, "Education fetched successfully.", educationEntries);
    }
    catch (err) {
        next(err);
    }
}

export const updateUserEducation = async (req, res, next) => {
    try {
        const {education_level, subjects} = req.body;
        const userId = req.params.userId;
        const educationId = req.params.educationId;

        if (!education_level || !subjects)
            throw new AppError(400, "Education level and Subjects are required.");

        const education = await updateEducationService(userId, educationId, education_level, subjects);
        if (!education)
            throw new AppError(404, "Education entry not found.");
        else handleResponse(res, 200, "Education updated successfully.", education);
    }
    catch (err) {
        next(err);
    }
}

export const deleteUserEducation = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const educationId = req.params.educationId;
        const education = await deleteEducationService(userId, educationId);
        if (!education)
            throw new AppError(404, "Education entry not found.");
        else handleResponse(res, 200, "Education deleted successfully.", education);
    } catch (err) {
        next(err);
    }
}