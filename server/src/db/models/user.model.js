import pool from "../../db/config/db.config.js";

export const getAllUsersService = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
};

export const getUserByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

export const createUserService = async (firstName, lastName, email) => {
    const result = await pool.query("INSERT INTO users VALUES ($1, $2, $3) RETURNING *",
        [firstName, lastName, email]);
    return result.rows[0];
};

export const updateUserService = async (id, firstName, lastName, email) => {
    const result = await pool.query("UPDATE users SET firstName=$1, lastName=$2, email=$3 WHERE id=$4 RETURNING *",
        [firstName, lastName, email, id]);
    return result.rows[0];
};

export const deleteUserService = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *",
        [id]);
    return result.rows[0];
};