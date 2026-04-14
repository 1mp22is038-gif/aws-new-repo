const { Pool } = require('pg');

let connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.DB_HOST && process.env.DB_USER) {
    const port = process.env.DB_PORT || 5432;
    connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${port}/${process.env.DB_NAME}`;
}

const pool = new Pool({
    connectionString,
    // Add these for better reliability on AWS EC2
    max: 20, 
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 2000, // Wait 2s for connection before failing (avoids 504 hang)
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle pg client', err);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
