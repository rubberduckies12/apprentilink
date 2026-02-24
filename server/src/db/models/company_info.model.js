import pool from "../../db/config/db.config.js";
import {getUserByIdService} from "./user.model.js";
import {AppError} from "../../middleware/error_handler.js";


export const createCompanyInfoService = async (userId, industry, contact_email, contact_phone, logo_url) => {
    const user = await getUserByIdService(userId);
    if (!user)
        return null;
    else if (user.user_type !== 'COMPANY')
        throw new AppError(400, "Only Companies can have company information.");

    const existingInfo = await getCompanyInfoByUserIdService(userId);
    if (existingInfo)
        throw new AppError(400, "User already has Company Info. Cannot create.");

    const client = pool.connect();
    try {
        await client.query("BEGIN");
        const result = await client.query("INSERT INTO company_info (user_id, industry, contact_email, contact_phone, logo_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
             [userId, industry, contact_email, contact_phone, logo_url]);

        await client.query("UPDATE app_stats SET companies_count_all_time = companies_count_all_time + 1");
        await client.query("COMMIT");
        return result.rows[0];
    }
    catch (err) {
        await client.query("ROLLBACK");
        throw err;
    }
    finally {
        await client.release();
    }
};

export const getCompanyInfoByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM company_info WHERE id = $1", [id]);
    return result.rows[0];
};

export const getCompanyInfoByUserIdService = async (userId) => {
    const user = await getUserByIdService(userId);
    if (!user)
        throw new AppError(404, "User not found.");

    const result = await pool.query("SELECT * FROM company_info WHERE user_id = $1", [userId]);
    return result.rows[0];
};

export const updateCompanyInfoService = async (userId, industry, contact_email, contact_phone, logo_url) => {
    const user = await getUserByIdService(userId);
    if (!user)
        throw new AppError(404, "User not found.");

    const info = await getCompanyInfoByUserIdService(userId);
    if (!info)
        return null;

    const result = await pool.query("UPDATE company_info SET industry=$1, contact_email=$2, contact_phone=$3, logo_url=$4, updated_at=CURRENT_TIMESTAMP WHERE user_id=$5 RETURNING *",
        [industry, contact_email, contact_phone, logo_url, userId]);
    return result.rows[0];
};