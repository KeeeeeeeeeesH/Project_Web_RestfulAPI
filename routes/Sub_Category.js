const express = require('express');
const router = express.Router();
const pool = require('../app');

//แสดงหมวดหมู่ย่อย(แท็กข่าว) โดยส่งหมวดหมู่หลักมาด้วย บนเว็บ
router.get('/', (req, res) => {
    const { catId } = req.query;
    let query = 'SELECT * FROM Sub_Category';
    let queryParams = [];

    //เพิ่มไอดีหมวดหมู่หลักเป็นเงื่อนไขในการ query
    if (catId) {
        query += ' WHERE Cat_Id = ?';
        queryParams.push(catId);
    }

    pool.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่ย่อย: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});

//เพิ่มแท็กข่าว บนเว็บ
  router.post('/', (req, res) => {
    const { Sub_Cat_Name, Cat_Id } = req.body;
    const query = 'INSERT INTO Sub_Category (Sub_Cat_Id, Sub_Cat_Name, Cat_Id) VALUES (NULL, ?, ?)';
    pool.query(query, [Sub_Cat_Name, Cat_Id], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        res.status(201).send('เพิ่มหมวดหมู่รองสำเร็จ');
    });
});

//แก้ไขชื่อแท็กข่าว และเปลี่ยนหมวดหมู่หลัก บนเว็บ
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Sub_Cat_Name, Cat_Id } = req.body;
  const query = 'UPDATE Sub_Category SET Sub_Cat_Name = ?, Cat_Id = ? WHERE Sub_Cat_Id = ?';
  pool.query(query, [Sub_Cat_Name, Cat_Id, id], (error, results) => {
      if (error) {
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('ไม่พบหมวดหมู่ย่อยที่มี ID ที่ระบุ');
      }
      res.send('แก้ไขหมวดหมู่รองสำเร็จ');
  });
});

//ลบแท็กข่าวบนเว็บ
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Sub_Category WHERE Sub_Cat_Id = ?';
  pool.query(query, [id], (error, results) => {
      if (error) {
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('ไม่พบหมวดหมู่ย่อยที่มี ID ที่ระบุ');
      }
      res.send('ลบหมวดหมู่รองสำเร็จ');
  });
});

//ดึงชื่อของแท็กข่าวแล้วเอาไปแสดงผล บนแอป
router.get('/tag/ids', (req, res) => {
    let ids = req.query.ids;
    // ตรวจสอบว่า ids เป็น array หรือไม่ ถ้าไม่ใช่ให้แปลงเป็น array
    if (!Array.isArray(ids)) {
        ids = ids.split(',').map(id => parseInt(id, 10));
    } else {
        ids = ids.map(id => parseInt(id, 10)); // แปลงแต่ละค่าใน array ให้เป็นตัวเลข
    }
    // ใช้ in ค้นหาหลายๆค่าของ sub cat id
    pool.query('SELECT * FROM Sub_Category WHERE Sub_Cat_Id IN (?)', [ids], (error, results) => {
        if (error) {
            console.error('ข้อผิดพลาดของฐานข้อมูล: ', error); 
            return res.status(500).json({ error: error.message });
        }
        if (results.length === 0) {
            console.log('ไม่พบผลลัพธ์สำหรับ ID: ', ids);
            return res.status(404).send('ไม่พบหมวดหมู่ย่อยที่มีรหัสที่ระบุ');
        }
        res.json(results);
    });
});

// router.get('/:id', (req, res) => {
//     const subCatId = req.params.id;
//     pool.query('SELECT * FROM Sub_Category WHERE Sub_Cat_Id = ?', [subCatId], (error, results) => {
//         if (error) {
//             console.error('เกิดข้อผิดพลาดในการเรียกหมวดหมู่ย่อยตาม ID: ', error);
//             res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
//             return;
//         }
//         if (results.length > 0) {
//             res.json(results[0]);
//         } else {
//             res.status(404).send('ไม่พบหมวดหมู่ย่อยที่มี ID ที่ระบุ');
//         }
//     });
// });

module.exports = router;
