const express = require('express');
const router = express.Router();
const pool = require('../app');

//แสดงข้อมูลหมวดหมู่บนเว็บและแอป
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Category', (error, results) => {
      if (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่: ', error);
        res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
        return;
      }
      res.json(results);
    });
  });

  //เพิ่มข้อมูลหมวดหมู่บนเว็บ
  router.post("/", function (req, res) {
    const { Cat_Name } = req.body;
    const query = 'INSERT INTO Category (Cat_Id, Cat_Name ) VALUES (NULL, ?)';
  
    pool.query(query, [Cat_Name], function(error, results) {
      if (error) {
        res.status(500).send(error.toString());
        return;
      }
        res.status(201).send('เพิ่มข้อมูลหมวดหมู่สำเร็จ');
    });
  });

  //แก้ไขหมวดหมู่บนเว็บ
  router.put('/:id', function(req, res) {
    const { id } = req.params;
    const { Cat_Name } = req.body;
    const query = 'UPDATE Category SET Cat_Name = ? WHERE Cat_Id = ?';
    pool.query(query, [Cat_Name, id], function(error, results) {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('ไม่พบหมวดหมู่ที่มี ID ที่ระบุ');
        }
        res.send('แก้ไขข้อมูลหมวดหมู่สำเร็จ');
    });
  });

  //ลบหมวดหมู่บนเว็บ
  router.delete('/:id', function(req, res) {
    const { id } = req.params;  
  
    if (!id) {
        return res.status(400).send('ต้องใช้ ID เพื่อลบ');
    }
    const query = 'DELETE FROM Category WHERE Cat_Id = ?';
    pool.query(query, [id], function(error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('ไม่พบหมวดหมู่ที่มี ID ที่ระบุ');
        }
        res.send('ลบข้อมูลหมวดหมู่สำเร็จ');
    });
  });
  
  //แสดงหมวดหมู่หลักพร้อมแท็กข่าวบนเว็บ
  router.get('/categories_with_sub', (req, res) => {
    const query = `
    SELECT Category.Cat_Id, Category.Cat_Name, Sub_Category.Sub_Cat_Id, Sub_Category.Sub_Cat_Name 
    FROM Category
    LEFT JOIN Sub_Category ON Category.Cat_Id = Sub_Category.Cat_Id
    ORDER BY Category.Cat_Id, Sub_Category.Sub_Cat_Id`;

    pool.query(query, (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการเรียกข้อมูลหมวดหมู่และหมวดหมู่ย่อยที่รวมกัน: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});

//แสดงชื่อหมวดหมู่จากไอดีบนแอป
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM Category WHERE Cat_Id  = ?', [id], (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่ตาม ID: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('ไม่พบหมวดหมู่ที่มี ID ที่ระบุ');
        }
    });
  });

module.exports = router;
