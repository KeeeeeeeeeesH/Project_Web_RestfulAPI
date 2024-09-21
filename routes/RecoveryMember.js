const express = require('express');
const router = express.Router();
const pool = require('../app');
const axios = require('axios');

// สำหรับกดขอ OTP
router.post('/request-otp', async (req, res) => {
    const { phone } = req.body;
    const memberQuery = 'SELECT Mem_Id FROM Member WHERE Mem_Phone = ?';
    try {
        const memberResult = await pool.promise().query(memberQuery, [phone]);

        // ตรวจสอบและแปลงเบอร์โทรศัพท์ให้อยู่ในรูปแบบ +66
        let formattedPhone;
        if (phone.startsWith('0')) {
            formattedPhone = '66' + phone.slice(1); // ตัดเลข 0 ออกและเพิ่ม 66 ข้างหน้า
        } else if (phone.startsWith('66')) {
            formattedPhone = phone; // ถ้าเบอร์โทรเริ่มต้นด้วย 66 แล้ว ให้ใช้เบอร์โทรเดิม
        } else {
            return res.status(400).json({ message: 'เบอร์โทรไม่ถูกต้อง' });
        }

        if (memberResult[0].length === 0) {
            return res.status(404).json({ message: 'ไม่พบหมายเลขโทรศัพท์นี้ในฐานข้อมูล' });
        }

        // เตรียมข้อมูลสำหรับขอ OTP
        const data = {
            secretKey: "5c430df2-905b3a50-680398aa-6cdf147e",
            apiKey: "b3146c53-8ccb409a-5525bbc7-1fb50a03",
            to: formattedPhone,  
            sender: "dee.SMSDemo",
            lang: "th",
            isShowRef: "1"
        };

        // ส่ง OTP ไปยังเบอร์โทร
        const otpResponse = await axios.post('https://apicall.deesmsx.com/v1/otp/request', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // ตรวจสอบว่าการส่ง OTP สำเร็จหรือไม่
        if (otpResponse.data && otpResponse.data.token) {
            req.session.otpToken = otpResponse.data.token;
            req.session.memberPhone = phone;
            
            // ส่งสถานะ HTTP 200 เมื่อ OTP ส่งสำเร็จ
            res.status(200).json({ success: true, message: 'OTP ถูกส่งสำเร็จ' });
        } else {
            // หาก API ส่งกลับสถานะไม่สำเร็จ ให้ส่งสถานะ 500 กลับ
            res.status(500).json({ message: 'ไม่สามารถส่ง OTP ได้', details: otpResponse.data });
        }
    } catch (error) {
        // แสดงข้อผิดพลาดใน console เพื่อ debugging
        console.error('เกิดข้อผิดพลาดในการส่ง OTP:', error);

        // ตรวจสอบว่าข้อผิดพลาดมาจาก API ของผู้ให้บริการหรือไม่
        if (error.response && error.response.data) {
            res.status(500).json({ message: 'ข้อผิดพลาดจาก API ของผู้ให้บริการ', details: error.response.data });
        } else {
            // ข้อผิดพลาดอื่นๆ ภายในเซิร์ฟเวอร์
            res.status(500).json({ message: 'ข้อผิดพลาดภายในเซิร์ฟเวอร์', details: error });
        }
    }
});


// สำหรับยืนยัน OTP ที่ได้รับ
router.post('/verify-otp', async (req, res) => {
    const { otp } = req.body;

    try {
        if (!req.session.otpToken) {
            return res.status(400).json({ success: false, message: 'ไม่มีการร้องขอ OTP ในระบบ' });
        }

        // เตรียมข้อมูลสำหรับยืนยัน OTP โดยใช้ API ใหม่
        const data = {
            secretKey: "5c430df2-905b3a50-680398aa-6cdf147e",
            apiKey: "b3146c53-8ccb409a-5525bbc7-1fb50a03",
            token: req.session.otpToken,
            pin: otp
        };

        // ตรวจสอบ OTP กับระบบ
        const verifyResponse = await axios.post('https://apicall.deesmsx.com/v1/otp/verify', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (verifyResponse.data && verifyResponse.data.status === 'success') {
            res.send({ success: true });
        } else {
            res.status(400).json({ success: false, message: 'รหัส OTP ไม่ถูกต้อง' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการตรวจสอบ OTP' });
    }
});

module.exports = router;
