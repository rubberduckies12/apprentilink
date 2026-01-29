import pool from "../../db/config/db.config.js";
import bcrypt from 'bcrypt';

export const getAllUsersService = async () => {
    const result = await pool.query("SELECT * FROM users ORDER BY id");
    return result.rows;
};

export const getUserByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

// Profile description and Postcode are optional when creating an account
export const createUserService = async (user_type, username, email, password, profile_desc = null, postcode = null) => {
    const password_hash = await hashPassword(password);

    const result = await pool.query("INSERT INTO users (user_type, username, email, password_hash, profile_description, postcode) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [user_type, username, email, password_hash, profile_desc, postcode]);
    return result.rows[0];
};

// Do not allow passwords to be changed using this endpoint - must use secure endpoint
// Also disallow changing of User Type
export const updateUserService = async (id, username, email, profile_desc, postcode) => {
    const result = await pool.query("UPDATE users SET username=$1, email=$2, profile_description=$3, postcode=$4 WHERE id=$5 RETURNING *",
        [username, email, profile_desc, postcode, id]);
    return result.rows[0];
};

export const deleteUserService = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *",
        [id]);
    return result.rows[0];
};

export const changePasswordService = async (id, currentPassword, newPassword, confirmNewPassword) => {
    if (newPassword !== confirmNewPassword)
        throw new Error("New password inputs do not match.");

    const user = await getUserByIdService(id);
    if (!user)
        return null;

    const currentPasswordHash = user.password_hash;
    const currentPasswordValid = await bcrypt.compare(currentPassword, currentPasswordHash);
    if (!currentPasswordValid)
        throw new Error("Current password is incorrect.");

    const newPasswordSame = await bcrypt.compare(newPassword, currentPasswordHash);
    if (newPasswordSame)
        throw new Error("New password cannot be the same as old password.");

    const newPasswordHash = await hashPassword(newPassword);
    const result = await pool.query("UPDATE users SET password_hash=$1 WHERE id=$2 RETURNING *",
        [newPasswordHash, id]);

    // Existing user sessions should be invalidated here

    return result.rows[0];
}

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}