const express = require('express');
const router = express.Router();
const pool = require('../app');

// ดึงจำนวนการอ่านทั้งหมดสำหรับทุกข่าว
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Total_Read', (error, results) => {
      if (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลการอ่านทั้งหมด:', error);
        res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
        return;
      }
      res.json(results);
    });
});

// ดึงจำนวนการอ่านเฉพาะของสมาชิกคนเดียวกัน
router.get('/member/:memId', (req, res) => {
    const { memId } = req.params;
    const query = 'SELECT * FROM Total_Read WHERE Mem_Id = ?';
    pool.query(query, [memId], (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลการอ่านของสมาชิก:', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});

// บันทึกการอ่านใหม่ พร้อมระบุ Mem_Id
router.post('/', (req, res) => {
    const { News_Id, Mem_Id } = req.body;
    const query = 'INSERT INTO Total_Read (Count_Id, News_Id, Mem_Id) VALUES (NULL, ?, ?)';
    pool.query(query, [News_Id, Mem_Id], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        res.status(201).send('เพิ่มข้อมูลยอดการอ่านสำเร็จ');
    });
});

// อัปเดตข้อมูลการอ่าน
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { News_Id, Mem_Id } = req.body;
    const query = 'UPDATE Total_Read SET News_Id = ?, Mem_Id = ? WHERE Count_Id = ?';
    pool.query(query, [News_Id, Mem_Id, id], (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตบันทึกการอ่านทั้งหมด: ', error);
            res.status(500).send(error.toString());
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('ไม่พบบันทึกการอ่านทั้งหมดที่มีรหัสที่ระบุ');
        }
        res.send('แก้ไขข้อมูลยอดการอ่านสำเร็จ');
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Total_Read WHERE Count_Id = ?';
    pool.query(query, [id], (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการลบบันทึกการอ่านทั้งหมด: ', error);
            res.status(500).send(error.toString());
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('ไม่พบบันทึกการอ่านทั้งหมดที่มีรหัสที่ระบุ');
        }
        res.send('ลบข้อมูลยอดการอ่านสำเร็จ');
    });
});

module.exports = router;
