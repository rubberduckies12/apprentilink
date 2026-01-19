import pkg from "pg";
const { Pool } = pkg;

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

export default pool;