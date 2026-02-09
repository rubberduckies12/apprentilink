import {
    createUserService,
    deleteUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    changePasswordService
} from "../db/models/user.model.js";
import handleResponse from "../utils/response_handler.js";
import {AppError} from "../middleware/error_handler.js";

export const createUser = async (req, res, next) => {
    const {user_type, first_name, last_name, email, password, profile_description} = req.body;

    if (!user_type)
        throw new AppError(400, "User Type is required.");
    else if (!first_name || !last_name)
        throw new AppError(400, "First name and Surname are required.");
    else if (!email)
        throw new AppError(400, "Email address is required.");
    else if (!password)
        throw new AppError(400, "Password is required.");

    try {
        const newUser = await createUserService(user_type, first_name, last_name, email, password, profile_description);
        handleResponse(res, 201, "User created successfully.", newUser);
    }
    catch (err) {
        next(err);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, "Users fetched successfully.", users);
    }
    catch (err) {
        next(err);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id; // Get ID from query parameters
        const user = await getUserByIdService(id);
        if (!user)
            throw new AppError(404, "User not found.");
        else handleResponse(res, 200, "User fetched successfully.", user);
    }
    catch (err) {
        next(err);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const {first_name, last_name, email, profile_description} = req.body;
        const id = req.params.id;

        if (!first_name || !last_name)
            throw new AppError(400, "First name and Surname are required.");
        if (!email)
            throw new AppError(400, "Email address is required.");

        const user = await updateUserService(id, first_name, last_name, email, profile_description);
        if (!user)
            throw new AppError(404, "User not found.");
        else handleResponse(res, 200, "User updated successfully.", user);
    }
    catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await deleteUserService(id);
        if (!user)
            throw new AppError(404, "User not found.");
        else handleResponse(res, 200, "User deleted successfully.", user);
    }
    catch (err) {
        next(err);
    }
}

export const changePassword = async (req, res, next) => {
    try {
        const { current_password, new_password, confirm_new_password } = req.body;
        const id = req.params.id;

        if (!current_password)
            throw new AppError(400, "Current Password is required.");
        else if (!new_password)
            throw new AppError(400, "New Password is required.");

        const newUser = await changePasswordService(id, current_password, new_password, confirm_new_password);
        if (!newUser)
            throw new AppError(404, "User not found.");
        else handleResponse(res, 200, "Password changed successfully.", newUser);
    }
    catch (err) {
        next(err);
    }
}