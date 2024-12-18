//แก้รหัสผ่านของแอดมิน ไม่ใช้แล้ว

const express = require('express');
const router = express.Router();
const pool = require('../app'); 

router.post('/reset-password', async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const adminPhone = req.session.adminPhone; // เก็บเบอร์โทรลง session
    let adminId;

        //ตรวจสอบว่ารหัสกับยืนยันรหัสตรงหรือไม่

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'รหัสผ่านไม่ตรงกัน' });
    }

    try {
        // ค้นหา Adm_Id ที่มีจากเบอร์โทร
        const adminQuery = 'SELECT Adm_Id FROM Admin WHERE Adm_Phone = ?';
        const [adminRows, _] = await pool.promise().query(adminQuery, [adminPhone]);
        if (adminRows.length === 0) {
            return res.status(404).json({ success: false, message: 'ไม่พบผู้ดูแลระบบ' });
        }
        adminId = adminRows[0].Adm_Id;

        //ตรวจสอบรหัสผ่านเก่าโดยค้นหาจาก Adm_Id
        const checkOldPasswordQuery = 'SELECT Adm_Password FROM Admin WHERE Adm_Id = ?';
        const [oldPasswordRows, result] = await pool.promise().query(checkOldPasswordQuery, [adminId]); 
        const oldPassword = oldPasswordRows[0].Adm_Password;

        if (newPassword === oldPassword) {
            return res.status(400).json({ success: false, message: 'รหัสผ่านต้องไม่ซ้ำกับรหัสผ่านเก่า' });
        }
        
        //อัพเดทรหัสผ่านใหม่
        const updateQuery = 'UPDATE Admin SET Adm_Password = ? WHERE Adm_Id = ?';
        const updateResult = await pool.promise().query(updateQuery, [newPassword, adminId]);
        if (updateResult[0].affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'ไม่พบผู้ดูแลระบบคนนี้' });
        }

        // clear session หลังเปลี่ยนรหัสสำเร็จ
        req.session.destroy();
        res.json({ success: true, message: 'แก้ไขรหัสผ่านสำเร็จ' });

    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน: ', error);
        res.status(500).json({ success: false, message: 'ข้อผิดพลาดเซิร์ฟเวอร์ภายใน' });
    }
});

module.exports = router;
