const express = require('express');
const router = express.Router();
const pool = require('../app');
const axios = require('axios');

// สำหรับกดขอ OTP
router.post('/request-otp', async (req, res) => {
    const { phone } = req.body;

    // ตรวจสอบเบอร์โทรจากใน DB และ format เลข ให้เข้าเงื่อนไข SMS Service
    const adminQuery = 'SELECT Adm_Id FROM Admin WHERE Adm_Phone = ?';
    try {
        const adminResult = await pool.promise().query(adminQuery, [phone]);
        const formattedPhone = phone.startsWith('0') ? '66' + phone.slice(1) : phone;

        if (adminResult[0].length === 0) {
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

        // เก็บ OTP token และข้อมูลไว้ใน session
        if (otpResponse.data && otpResponse.data.token) {
            req.session.otpToken = otpResponse.data.token;
            req.session.adminPhone = phone; // เก็บเบอร์โทรไว้ใน session
            res.send({ success: true, message: 'OTP ถูกส่งสำเร็จ' });
        } else {
            res.status(500).json({ message: 'ไม่สามารถส่ง OTP ได้', details: otpResponse.data });
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการส่ง OTP:', error);
        res.status(500).json({ message: 'ข้อผิดพลาดภายในเซิร์ฟเวอร์', details: error });
    }
});

// สำหรับยืนยัน OTP ที่ได้รับ
router.post('/verify-otp', async (req, res) => {
    const { otp } = req.body;

    try {
        if (!req.session.otpToken) {
            return res.status(400).json({ success: false, message: 'ไม่มีการร้องขอ OTP ในระบบ' });
        }

        // เตรียมข้อมูลสำหรับยืนยัน OTP
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
