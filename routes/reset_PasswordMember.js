const express = require('express');
const router = express.Router();
const pool = require('../app'); 

router.post('/reset-password', async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const memberPhone = req.session.memberPhone; // เก็บเบอร์โทรลง session
    let memberId;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'รหัสผ่านไม่ตรงกัน' });
    }

    try {
        // ค้นหา Mem_Id ด้วยเบอร์โทร
        const memberQuery = 'SELECT Mem_Id FROM Member WHERE Mem_Phone = ?';
        const [memberRows, _] = await pool.promise().query(memberQuery, [memberPhone]);
        if (memberRows.length === 0) {
            return res.status(404).json({ success: false, message: 'ไม่พบสมาชิก' });
        }
        memberId = memberRows[0].Mem_Id;

        const checkOldPasswordQuery = 'SELECT Mem_Password FROM Member WHERE Mem_Id = ?';
        const [oldPasswordRows, result] = await pool.promise().query(checkOldPasswordQuery, [memberId]);
        const oldPassword = oldPasswordRows[0].Mem_Password;

        if (newPassword === oldPassword) {
            return res.status(400).json({ success: false, message: 'รหัสผ่านต้องไม่ซ้ำกับรหัสผ่านเก่า' });
        }

        const updateQuery = 'UPDATE Member SET Mem_Password = ? WHERE Mem_Id = ?';
        const updateResult = await pool.promise().query(updateQuery, [newPassword, memberId]);
        if (updateResult[0].affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'ไม่พบสมาชิกคนนี้' });
        }

        // clear session หลังเปลี่ยนรหัสสำเร็จ
        req.session.destroy();
        res.json({ success: true, message: 'แก้ไขรหัสผ่านสำเร็จ' });

    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน: ', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
