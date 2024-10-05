const express = require("express");
const router = express.Router();
const pool = require("../app");

// API สำหรับการเข้าสู่ระบบผู้ดูแลระบบ
router.post('/login', (req, res) => {
    const { login, password } = req.body;

    const query = 'SELECT * FROM Admin WHERE (Adm_Username = ? OR Adm_Email = ?) AND Adm_Password = ?';
    pool.query(query, [login, login, password], (error, results) => {
        if (error) {
            console.error("Error fetching admin:", error);
            return res.status(500).json({ message: "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน" });
        }
        if (results.length > 0) {
            return res.status(200).json({ success: true, user: results[0] });
        } else {
            return res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรืออีเมลและรหัสผ่านไม่ตรงกัน' });
        }
    });
});

module.exports = router;
