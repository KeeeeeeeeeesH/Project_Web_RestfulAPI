const express = require('express');
const router = express.Router();
const pool = require('../app');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM Admin', (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});

router.post("/", function (req, res) {
    const { Adm_Fname, Adm_Lname, Adm_Username, Adm_Password, Adm_Email, Adm_Phone } = req.body;
    
    if (!/^0\d{9}$/.test(Adm_Phone)) {
        return res.status(400).json({ message: 'รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง' });
    }

    const query = 'INSERT INTO Admin (Adm_Id, Adm_Fname, Adm_Lname, Adm_Username, Adm_Password, Adm_Email, Adm_Phone) VALUES (NULL, ?, ?, ?, ?, ?, ?)';
    pool.query(query, [Adm_Fname, Adm_Lname, Adm_Username, Adm_Password, Adm_Email, Adm_Phone], function(error, results) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                if (error.sqlMessage.includes('Adm_Username')) {
                    return res.status(409).json({ message: 'มีชื่อผู้ใช้งานนี้ในระบบแล้ว' });
                } else if (error.sqlMessage.includes('Adm_Email')) {
                    return res.status(409).json({ message: 'มีอีเมล์นี้ในระบบแล้ว' });
                } else if (error.sqlMessage.includes('Adm_Phone')) {
                    return res.status(409).json({ message: 'มีเบอร์โทรศัพท์นี้ในระบบแล้ว' });
                }
            }
            return res.status(500).json({ message: error.toString() });
        }
        res.status(201).json({ message: 'เพิ่มข้อมูลแอดมินสำเร็จ' });
    });
});

router.put('/:id', function(req, res) {
    const { id } = req.params;
    const { Adm_Fname, Adm_Lname, Adm_Username, Adm_Email, Adm_Phone } = req.body;

    if (!/^0\d{9}$/.test(Adm_Phone)) {
        return res.status(400).json({ message: 'รูปแบบของเบอร์โทรศัพท์ไม่ถูกต้อง' });
    }

    const query = 'UPDATE Admin SET Adm_Fname = ?, Adm_Lname = ?, Adm_Username = ?, Adm_Email = ?, Adm_Phone = ? WHERE Adm_Id = ?';
    pool.query(query, [Adm_Fname, Adm_Lname, Adm_Username, Adm_Email, Adm_Phone, id], function(error, results) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                if (error.sqlMessage.includes('Adm_Username')) {
                    return res.status(409).json({ message: 'มีชื่อผู้ใช้งานนี้ในระบบแล้ว' });
                } else if (error.sqlMessage.includes('Adm_Email')) {
                    return res.status(409).json({ message: 'มีอีเมล์นี้ในระบบแล้ว' });
                } else if (error.sqlMessage.includes('Adm_Phone')) {
                    return res.status(409).json({ message: 'มีเบอร์โทรศัพท์นี้ในระบบแล้ว' });
                }
            }
            return res.status(500).json({ message: error.toString() });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('ไม่พบผู้ดูแลระบบที่มี ID ที่ระบุ');
        }
        res.json({ message: 'แก้ไขข้อมูลแอดมินสำเร็จ' });
    });
});

router.delete('/:id', function(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('ต้องใช้ ID เพื่อลบ');
    }

    const query = 'DELETE FROM Admin WHERE Adm_Id = ?';
    pool.query(query, [id], function(error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('ไม่พบผู้ดูแลระบบที่มี ID ที่ระบุ');
        }
        res.json({ message: 'ลบข้อมูลแอดมินสำเร็จ' });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM Admin WHERE Adm_Id = ?', [id], (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบด้วย ID: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('ไม่พบผู้ดูแลระบบที่มี ID ที่ระบุ');
        }
    });
});

module.exports = router;
