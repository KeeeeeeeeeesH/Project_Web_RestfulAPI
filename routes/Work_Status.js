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
    const query = 'INSERT INTO Work_Status (Adm_Id, Adm_Status, Start_Date, End_Date) VALUES (?, ?, ?, ?)';
    pool.query(query, [Adm_Id, Adm_Status, Start_Date, End_Date || null], function(error, results) {
        if (error) {
            res.status(500).send(error.toString());
        } else {
            res.status(201).send('เพิ่มสถานะการทำงานให้ผู้ดูแลระบบสำเร็จ');
        }
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
