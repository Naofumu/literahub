const pool = require('./db');
require('dotenv').config({path: './data/db.env'});

const initDb = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                genre VARCHAR (255),
                published_year INT)`);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL)`)
        console.log('Database initialized successfully')
        }
    catch (err) {
        console.error('Error initializing database:', err);
    }
}

initDb();