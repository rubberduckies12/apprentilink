import pkg from "pg";
const { Pool } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
    host: String(process.env.DB_HOST),
    port: process.env.DB_PORT,
    database: String(process.env.DB_NAME),
    user: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD),
};
console.log(options);

const pool = new Pool(options);

pool.on("connect", () => {
    console.log("Connection established with Database.");
});

// Error handling
pool.on("error", (err) => {
    console.error("Unexpected error with database", err);
    process.exit(-1);
});

export async function initializeDatabase() {
    try {
        console.log("Initializing database...");
        const schemaPath = path.join(__dirname, '../schema/schema.sql');

        if (fs.existsSync(schemaPath)) {
            const schema = fs.readFileSync(schemaPath, 'utf8');
            await pool.query(schema);
            console.log('Database schema initialized successfully');
        } else {
            console.error('Schema file not found at:', schemaPath);
        }
    } catch (err) {
        console.error('Error initializing database schema:', err);
    } finally {
        await pool.end();
    }
}

export default pool;