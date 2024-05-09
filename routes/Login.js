const express = require('express');
const router = express.Router();
const pool = require('../app');

router.post('/login', (req, res) => {
    const { login, password } = req.body;
    let sql = `SELECT Admin.*, Work_Status.Adm_Status 
               FROM Admin 
               LEFT JOIN Work_Status ON Admin.Adm_Id = Work_Status.Adm_Id 
               WHERE (Admin.Adm_Username = ? OR Admin.Adm_Email = ?) AND Admin.Adm_Password = ?`;

    pool.query(sql, [login, login, password], (err, results) => {
        if (err) {
            console.error('Error fetching admin:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Username or email and password do not match.' });
        }

        const admin = results[0];

        // Check if admin is in the correct status (ตรวจสอบเงื่อนไขใหม่จากฟิลด์ Adm_Status)
        if (admin.Adm_Status !== 1) {
            return res.status(403).json({ message: 'ไม่ได้อยู่ในสถานะผู้ดูแลระบบ' });
        }

        // If everything is okay, proceed to the dashboard or whatever your logic is
        res.json({ success: true, message: 'Login successful' });
    });
});

module.exports = router;
