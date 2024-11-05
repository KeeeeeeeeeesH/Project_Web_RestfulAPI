const express = require('express');
const router = express.Router();
const pool = require('../app');
const multer = require('multer'); //อัปโหลดไฟล์
const fs = require('fs'); //จัดการไฟล์บนเซิร์ฟ

// สุ่ม string สำหรับสร้างชื่อไฟล์
function generateShortFilename() {
    return Math.random().toString(36).substring(2, 10); // 8 ตัว
}

//ตั้งค่า multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // กำหนดไดเร็กทอรีเก็บไฟล์
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop(); //แยกชื่อไฟล์ต้นฉบับ
        const isCover = file.fieldname === 'coverImage'; //ถ้าเป็น true ระบุว่าเป็นรูปปก
        const randomName = generateShortFilename(); //สุ่มชื่อจากฟังก์ชันสร้างชื่อไฟล์
        const filename = isCover ? `cover_${randomName}.${ext}` : `${randomName}.${ext}`; //สร้างชื่อรูปหน้าปกหรือเนื้อหา
        cb(null, filename); // ตั้งชื่อไฟล์ใหม่เพื่อหลีกเลี่ยงชื่อซ้ำ
    }
});

//ตรวจสอบประเภทไฟล์
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('อนุญาตให้อัพโหลดเฉพาะไฟล์ .jpg และ .png เท่านั้น'), false);
    }
};

//แสดงข้อมูลทั้งหมด
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Picture', (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการเรียกรูปภาพ: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});

//กำหนดให้ใช้ storage กับ filefilter
const upload = multer({ storage: storage, fileFilter: fileFilter });

//อัปโหลดรูป
//หน้าปกได้รูปเดียว เนื้อหาได้ 10 รูป
router.post('/upload', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'contentImages', maxCount: 10 }]), (req, res) => {
    const { News_Id } = req.body;

    //ตรวจสอบว่ามีข่าวหรือไม่
    pool.query('SELECT News_Id FROM News WHERE News_Id = ?', [News_Id], (error, results) => {
        if (error) {
            res.status(500).json({ success: false, message: `เกิดข้อผิดพลาดในการตรวจสอบข่าว: ${error.toString()}` });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ success: false, message: `ข่าวพร้อมไอดี ${News_Id} ไม่พบ` });
            return;
        }

        const coverFiles = req.files.coverImage || []; //เก็บรูปปก
        const contentFiles = req.files.contentImages || []; //เก็บรูปเนื้อหา

        // ตรวจสอบเงื่อนไขการเพิ่มรูป
        pool.query('SELECT * FROM Picture WHERE News_Id = ? AND News_Pic LIKE "cover_%"', [News_Id], (error, results) => {    
            if (error) {
                //status 500
                res.status(500).json({ success: false, message: `เกิดข้อผิดพลาดในการตรวจสอบภาพหน้าปกที่มีอยู่: ${error.toString()}` });
                return;
            }
            if (results.length > 0 && coverFiles.length > 0) {
                //มีปกอยู่แล้ว
                res.status(400).json({ success: false, message: 'ไม่สามารถเพิ่มรูปหน้าปกซ้ำได้ กรุณาลบรูปภาพเดิมออกก่อน' });
                return;
            }
            if (coverFiles.length > 1) {
                //ปกอัปได้รูปเดียว
                res.status(400).json({ success: false, message: 'คุณสามารถอัปโหลดภาพหน้าปกได้เพียงภาพเดียวเท่านั้น' });
                return;
            }

            if (coverFiles.length > 0 && !coverFiles[0].originalname.startsWith('cover_')) {
                //ปกต้องขึ้นด้วย cover_
                res.status(400).json({ success: false, message: 'ชื่อไฟล์ภาพหน้าปกต้องขึ้นต้นด้วย "cover_".' });
                return;
            }
            //เรียกฟังก์ชั่น
            uploadFiles(req, res, News_Id, coverFiles, contentFiles);
        });
    });
});

//เพิ่มข้อมูลลงฐานข้อมูล
function uploadFiles(req, res, News_Id, coverFiles, contentFiles) {
    const allFiles = [...coverFiles, ...contentFiles]; //รวมรูปทั้งหมดไว้ array เดียว
    if (allFiles.length > 0) {
        //map ไอดีข่าวกับรูปข่าวเข้าฐานข้อมูล
        const values = allFiles.map(file => [News_Id, file.filename]); 
        const query = 'INSERT INTO Picture (News_Id, News_Pic) VALUES ?';
        //เพิ่มรูป
        pool.query(query, [values], (uploadError, uploadResults) => {
            if (uploadError) {
                res.status(500).json({ success: false, message: `เกิดข้อผิดพลาดในการอัปโหลดภาพ: ${uploadError.toString()}` });
                return;
            }
            res.status(201).json({ success: true, message: `${allFiles.length} อัพโหลดรูปภาพสำเร็จแล้ว!` });
        });
    } else {
        res.status(400).json({ success: false, message: 'ไม่มีภาพที่จะอัปโหลด' });
    }
}

//ลบรูป
router.delete('/:newsId/:newsPic', (req, res) => {
    const { newsId, newsPic } = req.params;
    const path = require('path');
    const filePath = path.join(__dirname, '..', 'uploads', newsPic);

    pool.query('DELETE FROM Picture WHERE News_Id = ? AND News_Pic = ?', [newsId, newsPic], (err, results) => {
        if (err) {
            console.error('เกิดข้อผิดพลาดในการลบรูปภาพ:', err);
            res.status(500).send(err.message);
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('ไม่พบรูปภาพ');
            return;
        }
        //ลบไฟล์ในระบบ
        fs.unlink(filePath, (fsErr) => {
            if (fsErr) {
                console.error('เกิดข้อผิดพลาดในการลบไฟล์: ', fsErr);
                res.status(500).send(fsErr.message);
                return;
            }
            res.send('ลบรูปภาพสำเร็จ');
        });
    });
});

//แสดงรูปของแต่ละข่าว
router.get('/news/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM Picture WHERE News_Id = ?', [id], (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการเรียกรูปภาพสำหรับข่าว: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});


module.exports = router;
