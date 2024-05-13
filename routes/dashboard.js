const express = require('express');
const router = express.Router();
const pool = require('../app');

// Get total number of news
router.get('/total-news', async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS totalNews FROM News';
        const [rows] = await pool.promise().query(query);
        const totalNews = rows[0].totalNews;
        res.json({ totalNews });
    } catch (error) {
        console.error('Error getting total news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get total number of news read
router.get('/total-read', async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS totalRead FROM Total_Read';
        const [rows] = await pool.promise().query(query);
        const totalRead = rows[0].totalRead;
        res.json({ totalRead });
    } catch (error) {
        console.error('Error getting total read:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get total number of members
router.get('/total-members', async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS totalMembers FROM Member';
        const [rows] = await pool.promise().query(query);
        const totalMembers = rows[0].totalMembers;
        res.json({ totalMembers });
    } catch (error) {
        console.error('Error getting total members:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
