const express = require('express');
const router = express.Router();
const pool = require('../app');

//แสดงข้อมูลยอดสรุป
router.get('/total-news', async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS totalNews FROM News';
        const [rows] = await pool.promise().query(query);
        const totalNews = rows[0].totalNews;
        res.json({ totalNews });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการรับข่าวสารทั้งหมด: ', error);
        res.status(500).json({ error: 'ข้อผิดพลาดเซิร์ฟเวอร์ภายใน' });
    }
});

router.get('/total-read', async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS totalRead FROM Total_Read';
        const [rows] = await pool.promise().query(query);
        const totalRead = rows[0].totalRead;
        res.json({ totalRead });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการรับการอ่านทั้งหมด: ', error);
        res.status(500).json({ error: 'ข้อผิดพลาดเซิร์ฟเวอร์ภายใน' });
    }
});

router.get('/total-members', async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) AS totalMembers FROM Member';
        const [rows] = await pool.promise().query(query);
        const totalMembers = rows[0].totalMembers;
        res.json({ totalMembers });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการรับสมาชิกทั้งหมด: ', error);
        res.status(500).json({ error: 'ข้อผิดพลาดเซิร์ฟเวอร์ภายใน' });
    }
});

// แสดงผลตารางแบบ dynamic
router.get('/table/:tableName', async (req, res) => {
    const { tableName } = req.params;
    const validTables = [
        'Admin', 'Work_Status', 'Category', 'Sub_Category', 'Member',
        'Favorite_Category', 'Read_Later', 'Read_History', 'News', 
        'News_Rating', 'News_Sub_Cate', 'Picture', 'Total_Read', 'Major'
    ];
    if (!validTables.includes(tableName)) {
        return res.status(400).json({ error: 'ชื่อตารางไม่ถูกต้อง' });
    }
    try {
        const query = `SELECT * FROM ${tableName}`;
        const [rows] = await pool.promise().query(query);
        res.json(rows);
    } catch (error) {
        console.error(`เกิดข้อผิดพลาดในการรับข้อมูลจาก ${tableName}:`, error);
        res.status(500).json({ error: 'ข้อผิดพลาดเซิร์ฟเวอร์ภายใน' });
    }
});

module.exports = router;
