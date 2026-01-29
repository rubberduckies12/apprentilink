import {
    createUserService,
    deleteUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    changePasswordService, getUserByEmailService
} from "../db/models/user.model.js";
import handleResponse from "./response_handler.js";
import {AppError} from "../middleware/error_handler.js";

export const createUser = async (req, res, next) => {
    const {user_type, username, email, password, profile_description, postcode} = req.body;

    if (!user_type)
        throw new AppError(400, "User Type is required.");
    else if (!username)
        throw new AppError(400, "Username is required.");
    else if (!email)
        throw new AppError(400, "Email address is required.");
    else if (!password)
        throw new AppError(400, "Password is required.");

    try {
        const newUser = await createUserService(user_type, username, email, password, profile_description, postcode);
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
        const {username, email, profile_description, postcode} = req.body;
        const id = req.params.id;

        if (!username || !email)
            throw new AppError(400, "Username and Email address are required.");

        const user = await updateUserService(id, username, email, profile_description, postcode);
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