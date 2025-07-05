const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
require('dotenv').config({path: './data/db.env'});
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, hashedPassword]
        );
        res.status(201).json({message: 'User registered successfully'});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (rows.length === 0) {
            return res.status(401).json({message: 'Invalid username or password'});
        }
        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: 'Invalid username or password'})
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: 'Login successful', token});
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router;