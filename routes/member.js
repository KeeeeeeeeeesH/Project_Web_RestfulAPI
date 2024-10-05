const express = require('express');
const router = express.Router();
const pool = require('../app');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM Member', (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสมาชิก: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});

router.post("/", function (req, res) {
  const { Mem_Fname, Mem_Lname, Mem_Username, Mem_Password, Mem_Email, Mem_Phone } = req.body;
  
  if (!/^0\d{9}$/.test(Mem_Phone)) {
      return res.status(400).json({ message: 'รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง' });
  }
  
  const query = 'INSERT INTO Member (Mem_Id, Mem_Fname, Mem_Lname, Mem_Username, Mem_Password, Mem_Email, Mem_Phone) VALUES (NULL, ?, ?, ?, ?, ?, ?)';
  pool.query(query, [Mem_Fname, Mem_Lname, Mem_Username, Mem_Password, Mem_Email, Mem_Phone], function(error, results) {
      if (error) {
          if (error.code === 'ER_DUP_ENTRY') {
              if (error.sqlMessage.includes('Mem_Username')) {
                  return res.status(409).json({ message: 'มีชื่อผู้ใช้งานนี้ในระบบแล้ว' });
              } else if (error.sqlMessage.includes('Mem_Email')) {
                  return res.status(409).json({ message: 'มีอีเมล์นี้ในระบบแล้ว' });
              } else if (error.sqlMessage.includes('Mem_Phone')) {
                  return res.status(409).json({ message: 'มีเบอร์โทรศัพท์นี้ในระบบแล้ว' });
              }
          }
          return res.status(500).json({ message: error.toString() });
      }
      res.status(201).json({ message: 'เพิ่มข้อมูลสมาชิกสำเร็จ' });
  });
});

router.delete('/:id', function (req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('ต้องใช้ ID เพื่อลบ');
    }

    const query = 'DELETE FROM Member WHERE Mem_Id = ?';
    pool.query(query, [id], function (error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('ไม่พบสมาชิกที่มี ID ที่ระบุ');
        }
        res.send('ลบข้อมูลสมาชิกสำเร็จ');
    });
});

router.put('/:id', function (req, res) {
    const { id } = req.params;
    const { Mem_Fname, Mem_Lname, Mem_Username, Mem_Email, Mem_Phone} = req.body;

    if (!/^0\d{9}$/.test(Mem_Phone)) {
        return res.status(400).json({ message: 'รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง' });
    }

    const query = 'UPDATE Member SET Mem_Fname = ?, Mem_Lname = ?, Mem_Username = ?, Mem_Email = ?, Mem_Phone = ? = ? WHERE Mem_Id = ?';
    pool.query(query, [Mem_Fname, Mem_Lname, Mem_Username, Mem_Email, Mem_Phone, id], function (error, results) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                if (error.sqlMessage.includes('Mem_Username')) {
                    return res.status(409).json({ message: 'มีชื่อผู้ใช้งานนี้ในระบบแล้ว' });
                } else if (error.sqlMessage.includes('Mem_Email')) {
                    return res.status(409).json({ message: 'มีอีเมล์นี้ในระบบแล้ว' });
                } else if (error.sqlMessage.includes('Mem_Phone')) {
                    return res.status(409).json({ message: 'มีเบอร์โทรศัพท์นี้ในระบบแล้ว' });
                }
            }
            return res.status(500).json({ message: error.toString() });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('ไม่พบสมาชิกที่มี ID ที่ระบุ');
        }
        res.json({ message: 'แก้ไขข้อมูลสมาชิกสำเร็จ' });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM Member WHERE Mem_Id = ?', [id], (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสมาชิกด้วย ID: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('ไม่พบสมาชิกที่มี ID ที่ระบุ');
        }
    });
});

module.exports = router;
