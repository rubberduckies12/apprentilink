import handleResponse from "../utils/response_handler.js";
import {AppError} from "../middleware/error_handler.js";
import {
    createCompanyInfoService,
    deleteCompanyInfoService, getCompanyInfoByIdService,
    getCompanyInfoByUserIdService,
    updateCompanyInfoService
} from "../db/models/company_info.model.js";

export const createCompanyInfo = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const {industry, contact_email, contact_phone, logo_url} = req.body;

        const company = await createCompanyInfoService(userId, industry, contact_email, contact_phone, logo_url);
        if (!company)
            throw new AppError(404, "User not found.");
        else handleResponse(res, 201, "Company Info created successfully.", company);
    }
    catch (err) {
        next(err);
    }
}


export const getCompanyInfoById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const company = await getCompanyInfoByIdService(id);
        if (!company)
            throw new AppError(404, "Company Info not found.");
        else handleResponse(res, 200, "Company Info fetched successfully.", company);
    }
    catch (err) {
        next(err);
    }
}

export const getCompanyInfoByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const company = await getCompanyInfoByUserIdService(userId);
        if (!company)
            throw new AppError(404, "Company Info not found.");
        else handleResponse(res, 200, "Company Info fetched successfully.", company);
    }
    catch (err) {
        next(err);
    }
}

export const updateCompanyInfo = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const {industry, contact_email, contact_phone, logo_url} = req.body;

        const company = await updateCompanyInfoService(userId, industry, contact_email, contact_phone, logo_url);
        if (!company)
            throw new AppError(404, "Company Info not found.");
        else handleResponse(res, 200, "Company Info updated successfully.", company);
    }
    catch (err) {
        next(err);
    }
}

export const deleteCompanyInfo = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const company = await deleteCompanyInfoService(userId);
        if (!company)
            throw new AppError(404, "Company Info not found.");
        else handleResponse(res, 200, "Company Info deleted successfully.", company);
    }
    catch (err) {
        next(err);
    }
}