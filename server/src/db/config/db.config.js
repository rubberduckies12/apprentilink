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

const pool = new Pool(options);

// Error handling
pool.on("error", (err) => {
    console.error("Unexpected error with database! ", err);
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

            // If this is a development environment, insert test data
            if (process.env.NODE_ENV === 'development') {
                try {
                    const testDataPath = path.join(__dirname, '../schema/test_data.sql');

                    if (fs.existsSync(testDataPath)) {
                        const testData = fs.readFileSync(testDataPath, 'utf8');
                        await pool.query(testData);
                        console.log('Test data inserted successfully');
                    } else {
                        console.error('Test data file not found at:', testDataPath);
                    }
                }
                catch (err) {
                    console.error(err.stack);
                    console.error("Failed to insert test data. Database will be empty.");
                }
            }
        } else {
            console.error('Schema file not found at:', schemaPath);
            await pool.end();
        }
    }
    catch (err) {
        console.error("Error initializing database!");
        await pool.end();
        throw err;
    }
}

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nGracefully shutting down database connections...');
    await pool.end();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\nGracefully shutting down database connections...');
    await pool.end();
    process.exit(0);
});

export default pool;