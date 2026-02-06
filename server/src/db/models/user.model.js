import pool from "../../db/config/db.config.js";
import bcrypt from 'bcrypt';
import {AppError} from "../../middleware/error_handler.js";
import hashPassword from "../../utils/password.util.js";
import validatePostcode from "../../utils/input_validation.util.js";

export const getAllUsersService = async () => {
    const result = await pool.query("SELECT * FROM users ORDER BY id");
    return result.rows;
};

export const getUserByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

export const getUserByEmailService = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
}

// Profile description and Postcode are optional when creating an account
export const createUserService = async (user_type, first_name, last_name, email, password, profile_desc = null, postcode = null) => {
    const existingUser = await getUserByEmailService(email);
    if (existingUser)
        throw new AppError(400, "A user with this email address already exists.");

    if (!email.includes('@'))
        throw new AppError(400, "Email address is not formatted correctly.");

    if (postcode && !validatePostcode(postcode))
        throw new AppError(400, "Post Code is not formatted correctly.");

    const password_hash = await hashPassword(password);

    const result = await pool.query("INSERT INTO users (user_type, first_name, last_name, email, password_hash, profile_description, postcode) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [user_type, first_name, last_name, email, password_hash, profile_desc, postcode]);
    return result.rows[0];
};

// Do not allow passwords to be changed using this endpoint - must use secure endpoint
// Also disallow changing of User Type
export const updateUserService = async (id, first_name, last_name, email, profile_desc, postcode) => {
    const user = await getUserByIdService(id);
    if (!user)
        return null;

    if (email !== user.email) { // If the email address has changed, validate it
        const userWithEmail = await getUserByEmailService(email);
        if (userWithEmail)
            throw new AppError( 400, "A user with this email address already exists.");

        if (!email.includes('@'))
            throw new AppError(400, "Email address is not formatted correctly.");
    }

    if (postcode !== user.postcode && !validatePostcode(postcode))
        throw new AppError(400, "Post Code is not formatted correctly.");

    const result = await pool.query("UPDATE users SET first_name=$1, last_name=$2, email=$3, profile_description=$4, postcode=$5, updated_at=CURRENT_TIMESTAMP WHERE id=$6 RETURNING *",
        [first_name, last_name, email, profile_desc, postcode, id]);
    return result.rows[0];
};

export const deleteUserService = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *",
        [id]);
    return result.rows[0];
};

export const changePasswordService = async (id, currentPassword, newPassword, confirmNewPassword) => {
    if (newPassword !== confirmNewPassword)
        throw new AppError(400, "New password inputs do not match.");

    const user = await getUserByIdService(id);
    if (!user)
        return null;

    const currentPasswordHash = user.password_hash;
    const currentPasswordValid = await bcrypt.compare(currentPassword, currentPasswordHash);
    if (!currentPasswordValid)
        throw new AppError(400, "Current password is incorrect.");

    const newPasswordSame = await bcrypt.compare(newPassword, currentPasswordHash);
    if (newPasswordSame)
        throw new AppError(400, "New password cannot be the same as old password.");

    const newPasswordHash = await hashPassword(newPassword);
    const result = await pool.query("UPDATE users SET password_hash=$1, updated_at=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *",
        [newPasswordHash, id]);

    // Existing user sessions should be invalidated here

    return result.rows[0];
}