const express = require('express');
const router = express.Router();
const pool = require('../app');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM Work_Status', (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการเรียกสถานะงาน: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});

router.post("/", function (req, res) {
    const { Adm_Id, Adm_Status, Start_Date, End_Date } = req.body;

    // ตรวจสอบว่ามีสถานะการทำงานของ Admin นี้อยู่แล้วหรือไม่
    const checkQuery = 'SELECT * FROM Work_Status WHERE Adm_Id = ? AND Adm_Status = 1';
    pool.query(checkQuery, [Adm_Id], (checkError, checkResults) => {
        if (checkError) {
            return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการตรวจสอบสถานะ', error: checkError.toString() });
        }

        if (checkResults.length > 0) {
            return res.status(400).json({ message: 'มีสถานะการทำงานของผู้ดูแลระบบนี้อยู่แล้ว' });
        }

        // ถ้าไม่มีสถานะการทำงานซ้ำ ให้เพิ่มสถานะใหม่
        const insertQuery = 'INSERT INTO Work_Status (Adm_Id, Adm_Status, Start_Date, End_Date) VALUES (?, ?, ?, ?)';
        pool.query(insertQuery, [Adm_Id, Adm_Status, Start_Date, End_Date || null], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มสถานะการทำงาน', error: error.toString() });
            }
            res.status(201).json({ message: 'เพิ่มสถานะการทำงานสำเร็จ' });
        });
    });
});


router.put('/:Adm_Id', function(req, res) {
    const { Adm_Id } = req.params;  
    const { Adm_Status, Start_Date, End_Date } = req.body;

    const query = 'UPDATE Work_Status SET Adm_Status = ?, Start_Date = ?, End_Date = ? WHERE Adm_Id = ?';
    pool.query(query, [Adm_Status, Start_Date, Adm_Status == '1' ? null : End_Date, Adm_Id], (error, results) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('ไม่พบสถานะการทำงานตามรหัสที่ระบุ');
        }
        res.send('แก่ไขสถานะการทำงานเสร็จ');
    });
});

router.delete('/:Adm_Id', (req, res) => {
    const { Adm_Id } = req.params;
    const query = 'DELETE FROM Work_Status WHERE Adm_Id = ?';
    pool.query(query, [Adm_Id], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('ไม่พบสถานะการทำงานตามรหัสผู้ดูแลระบบที่ระบุ');
        }
        res.send('ลบสถานะการทำงานสำเร็จ');
    });
});

router.get('/:Adm_Id', (req, res) => {
  const { Adm_Id } = req.params;
  const query = 'SELECT * FROM Work_Status WHERE Adm_Id = ?';
  pool.query(query, [Adm_Id], (error, results) => {
      if (error) {
          console.error('เกิดข้อผิดพลาดในการเรียกสถานะงาน: ', error);
          res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
          return;
      }
      if (results.length === 0) {
          res.status(404).send('ไม่พบสถานะการทำงานตามรหัสที่ระบุ');
          return;
      }
      res.json(results[0]);
  });
});
module.exports = router;
