const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the pool

router.post('/auth', async (req, res) => {
    const { address } = req.body;

    if (!address) {
        return res.status(400).json({ message: 'Ethereum address is required' });
    }

    try {
        // Check if user exists
        const [rows] = await db.query('SELECT * FROM users WHERE eth_address = ?', [address]);

        if (rows.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            await db.query('INSERT INTO users (eth_address) VALUES (?)', [address]);
            res.status(201).json({ message: 'User registered and logged in' });
        }
    } catch (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
