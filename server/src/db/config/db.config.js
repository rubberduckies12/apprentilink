import pkg from "pg";
const { Pool } = pkg;
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
    console.log("Connection established with Database.");
});

// Error handling
pool.on("error", (err) => {
    console.error("Unexpected error with database", err);
    process.exit(-1);
});

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

async function initializeDatabase() {
    try {
        console.log("Initializing database...");
        const client = await pool.connect();
        const schemaPath = path.join(__dirname, '../schema/schema.sql');

        if (fs.existsSync(schemaPath)) {
            const schema = fs.readFileSync(schemaPath, 'utf8');
            await client.query(schema);
            console.log('Database schema initialized successfully');
        } else {
            console.error('Schema file not found at:', schemaPath);
        }
        client.release();
    } catch (err) {
        console.error('Error initializing database schema:', err);
    } finally {
        await pool.end();
    }
}

module.exports = {pool, initializeDatabase};