const express = require('express');
const router = express.Router();
const pool = require('../app');

//แสดงข้อมูล
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Major', (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลระดับความสำคัญสำเร็จ:', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});

//เพิ่มข้อมูล
router.post("/", function (req, res) {
    const { Major_Level } = req.body;

    // ตรวจสอบว่า Major_Level มีอยู่แล้วหรือไม่
    const checkQuery = 'SELECT * FROM Major WHERE Major_Level = ?';
    pool.query(checkQuery, [Major_Level], function (error, results) {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการตรวจสอบระดับความสำคัญ:', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }

        if (results.length > 0) {
            // ตรวจระดับความสำคัญซ้ำ
            res.status(400).send('มีระดับความสำคัญนี้แล้ว');
        } else {
            // หากไม่มี ให้ทำการ insert ข้อมูลใหม่
            const insertQuery = 'INSERT INTO Major (Major_Level) VALUES (?)';
            pool.query(insertQuery, [Major_Level], function (error, results) {
                if (error) {
                    res.status(500).send(error.toString());
                } else {
                    res.status(201).send('เพิ่มระดับความสำคัญสำเร็จ');
                }
            });
        }
    });
});

//ลบข้อมูล
router.delete('/:id', function (req, res) {
    const { id } = req.params;

    const query = 'DELETE FROM Major WHERE Major_Id = ?';
    pool.query(query, [id], function (error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('ไม่พบระดับความสำคัญสำเร็จที่มี ID ที่ระบุ');
        }
        res.send('ลบระดับความสำคัญสำเร็จ');
    });
});

//แสดง level จาก id บนแอป
router.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM Major WHERE Major_Id = ?', [id], (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงระดับความสำคัญสำเร็จด้วย ID: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('ไม่พบระดับความสำคัญสำเร็จที่มี ID ที่ระบุ');
        }
    });
});

//แก้ไขข้อมูล
// router.put('/:id', function (req, res) {
//     const { id } = req.params;
//     const { Major_Level } = req.body;

//     const query = 'UPDATE Major SET Major_Level = ? WHERE Major_Id = ?';
//     pool.query(query, [Major_Level, id], function (error, results) {
//         if (error) {
//             return res.status(500).send(error.toString());
//         }
//         if (results.affectedRows === 0) {
//             return res.status(404).send('ไม่พบระดับความสำคัญสำเร็จที่มี ID ที่ระบุ');
//         }
//         res.send('แก้ไขระดับความสำคัญสำเร็จ');
//     });
// });


module.exports = router;
