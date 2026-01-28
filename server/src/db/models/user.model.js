import pool from "../../db/config/db.config.js";

export const getAllUsersService = async () => {
    const result = await pool.query("SELECT * FROM users ORDER BY id");
    return result.rows;
};

export const getUserByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

// Profile description and Postcode are optional when creating an account
export const createUserService = async (username, email, password_hash, profile_desc = null, postcode = null) => {
    const result = await pool.query("INSERT INTO users (username, email, password_hash, profile_description, postcode) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, email, password_hash, profile_desc, postcode]);
    return result.rows[0];
};

export const updateUserService = async (id, username, email, password_hash, profile_desc, postcode) => {
    const result = await pool.query("UPDATE users SET username=$1, email=$2, password_hash=$3, profile_description=$4, postcode=$5 WHERE id=$6 RETURNING *",
        [username, email, password_hash, profile_desc, postcode, id]);
    return result.rows[0];
};

export const deleteUserService = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *",
        [id]);
    return result.rows[0];
};