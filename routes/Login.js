const express = require('express');
const router = express.Router();
const pool = require('../app'); 

router.post('/login', (req, res) => {
    const { login, password } = req.body;
    let sql = `SELECT Admin.*, Work_Status_Detail.Status_Id 
               FROM Admin 
               LEFT JOIN Work_Status_Detail ON Admin.Adm_Id = Work_Status_Detail.Adm_Id 
               WHERE Admin.Adm_Username = ? OR Admin.Adm_Email = ?`;
    pool.query(sql, [login, login, password], (err, results) => {
                if (err) {
                    console.error('Error fetching admin:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }
        
                if (results.length === 0) {
                    return res.status(401).json({ message: 'Username or email and password do not match.' });
                }
        
                const admin = results[0];
        
                // Check if admin is in the correct status
                if (admin.Status_Id !== 2) {
                    return res.status(403).json({ message: 'ไม่ได้อยู่ในสถานะผู้ดูแลระบบ' });
                }
        
                // If everything is okay, proceed to the dashboard or whatever your logic is
                res.json({ success: true, message: 'Login successful'});
            });
        });

module.exports = router;
