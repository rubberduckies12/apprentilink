import handleResponse from "../utils/response_handler.js";
import {AppError} from "../middleware/error_handler.js";
import {
    createCompanyInfoService,
    deleteCompanyInfoService,
    getCompanyInfoByUserIdService,
    updateCompanyInfoService
} from "../db/models/company_info.model.js";

export const createCompanyInfo = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const {industry, contact_email, contact_phone, logo_url} = req.body;

        const preferences = await createCompanyInfoService(userId, industry, contact_email, contact_phone, logo_url);
        if (!preferences)
            throw new AppError(404, "User not found.");
        else handleResponse(res, 201, "Company Info created successfully.", preferences);
    }
    catch (err) {
        next(err);
    }
}

export const getCompanyInfo = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const preferences = await getCompanyInfoByUserIdService(userId);
        if (!preferences)
            throw new AppError(404, "Company Info not found.");
        else handleResponse(res, 200, "Company Info fetched successfully.", preferences);
    }
    catch (err) {
        next(err);
    }
}

export const updateCompanyInfo = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const {industry, contact_email, contact_phone, logo_url} = req.body;

        const preferences = await updateCompanyInfoService(userId, industry, contact_email, contact_phone, logo_url);
        if (!preferences)
            throw new AppError(404, "Company Info not found.");
        else handleResponse(res, 200, "Company Info updated successfully.", preferences);
    }
    catch (err) {
        next(err);
    }
}

export const deleteCompanyInfo = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const preferences = await deleteCompanyInfoService(userId);
        if (!preferences)
            throw new AppError(404, "Company Info not found.");
        else handleResponse(res, 200, "Company Info deleted successfully.", preferences);
    }
    catch (err) {
        next(err);
    }
}