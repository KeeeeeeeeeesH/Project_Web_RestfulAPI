const express = require('express');
const router = express.Router();
const pool = require('../app');
const https = require('https');

// สำหรับกดขอ OTP (Request OTP)
router.post('/request-otp', async (req, res) => {
    const { phone } = req.body;
    const adminQuery = 'SELECT Adm_Id FROM Admin WHERE Adm_Phone = ?';

    try {
        // ตรวจสอบหมายเลขโทรศัพท์ในฐานข้อมูล
        const adminResult = await pool.promise().query(adminQuery, [phone]);

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
        const data = JSON.stringify({
            secretKey: "5c430df2-905b3a50-680398aa-6cdf147e",
            apiKey: "b3146c53-8ccb409a-5525bbc7-1fb50a03",
            to: formattedPhone,
            sender: "dee.SMSDemo",
            lang: "th",
            isShowRef: "1"
        });

        // ตั้งค่า options สำหรับ https request
        const options = {
            hostname: 'apicall.deesmsx.com',
            path: '/v1/otp/request',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        // ทำการส่ง request OTP ไปยังผู้ให้บริการ
        const otpRequest = https.request(options, (otpRes) => {
            let responseData = '';

            // เก็บข้อมูลที่ส่งกลับมา
            otpRes.on('data', (chunk) => {
                responseData += chunk;
            });

            // เมื่อได้รับข้อมูลทั้งหมดแล้ว
            otpRes.on('end', () => {
                try {
                    const result = JSON.parse(responseData);
                    
                    // check service msg + result token
                    if (result && result.msg === '[ACCEPTD] Message is in accepted state') {
                        // keep token in session and response
                        req.session.otpToken = result.result?.token || '';  
                        req.session.adminPhone = phone;
                        res.status(200).json({ success: true, message: 'OTP ถูกส่งสำเร็จ' });
                    } else {
                        console.error('การส่ง OTP ล้มเหลว:', result);
                        res.status(500).json({ message: result.msg || 'ไม่สามารถส่ง OTP ได้', details: result });
                    }
                } catch (error) {
                    console.error('เกิดข้อผิดพลาดในการแปลงข้อมูล:', error);
                    res.status(500).json({ message: 'ข้อผิดพลาดในการประมวลผลข้อมูลจากผู้ให้บริการ', details: error });
                }
            });
        });

        // ตรวจสอบข้อผิดพลาดของการเชื่อมต่อ
        otpRequest.on('error', (error) => {
            console.error('เกิดข้อผิดพลาดในการส่ง OTP:', error);
            res.status(500).json({ message: 'ข้อผิดพลาดในการเชื่อมต่อกับผู้ให้บริการ', details: error });
        });

        // ส่งข้อมูลไปกับ request
        otpRequest.write(data);
        otpRequest.end();

    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการส่ง OTP:', error);
        res.status(500).json({ message: 'ข้อผิดพลาดภายในเซิร์ฟเวอร์', details: error });
    }
});

router.post('/verify-otp', async (req, res) => {
    const { otp } = req.body;

    try {
        // ตรวจสอบว่า session มีการเก็บ otpToken หรือไม่
        if (!req.session.otpToken) {
            return res.status(400).json({ success: false, message: 'ไม่มีการร้องขอ OTP ในระบบ' });
        }

        // เตรียมข้อมูลสำหรับยืนยัน OTP โดยใช้ API ใหม่
        const data = JSON.stringify({
            secretKey: "5c430df2-905b3a50-680398aa-6cdf147e",
            apiKey: "b3146c53-8ccb409a-5525bbc7-1fb50a03",
            token: req.session.otpToken,
            pin: otp
        });

        // ตั้งค่า options สำหรับ https request
        const options = {
            hostname: 'apicall.deesmsx.com',
            path: '/v1/otp/verify',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        // ทำการส่ง request ไปยัง API ของผู้ให้บริการเพื่อยืนยัน OTP
        const verifyRequest = https.request(options, (verifyRes) => {
            let responseData = '';

            verifyRes.on('data', (chunk) => {
                responseData += chunk;
            });

            verifyRes.on('end', () => {
                try {
                    const result = JSON.parse(responseData);
            
                    // ตรวจสอบเงื่อนไขความสำเร็จจากข้อความ msg
                    if (result && result.msg && result.msg.toLowerCase().includes('verify success')) {
                        // หากตรวจสอบ OTP สำเร็จ
                        res.send({ success: true, message: 'OTP ยืนยันสำเร็จ' });
                    } else {
                        // หากตรวจสอบ OTP ไม่สำเร็จ
                        res.status(400).json({ success: false, message: 'รหัส OTP ไม่ถูกต้อง', details: result });
                    }
                } catch (error) {
                    console.error('เกิดข้อผิดพลาดในการแปลงข้อมูล:', error);
                    res.status(500).json({ message: 'ข้อผิดพลาดในการประมวลผลข้อมูลจากผู้ให้บริการ', details: error });
                }
            });
        });

        verifyRequest.on('error', (error) => {
            console.error('Error verifying OTP:', error);
            res.status(500).json({ success: false, message: 'ข้อผิดพลาดในการเชื่อมต่อกับผู้ให้บริการ', details: error });
        });

        // ส่งข้อมูลไปกับ request
        verifyRequest.write(data);
        verifyRequest.end();

    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการตรวจสอบ OTP', details: error });
    }
});


module.exports = router;
