const express = require('express');
const router = express.Router();
const pool = require('../app');

//แสดงข้อมูลบนเว็บ
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Favorite_Category', (error, results) => {
      if (error) {
        console.error('เกิดข้อผิดพลาดในการเรียกหมวดหมู่รายการโปรด: ', error);
        res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
        return;
      }
      res.json(results);
    });
});

//ดึงรายการข่าวจากหมวดหมู่โปรดที่เลือกบนแอป
router.get('/news', (req, res) => {
    const { memId } = req.query;

    //ใช้ inner join เพื่อดึงข่าวที่มี Cat_Id ตรงกับ Cat_Id ที่สมาชิกเลือก
    const query = `
        SELECT n.* FROM News n
        INNER JOIN Favorite_Category fc ON fc.Cat_Id = n.Cat_Id
        WHERE fc.Mem_Id = ?
    `;
    pool.query(query, [memId], (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการเรียกข่าวหมวดหมู่ที่ชื่นชอบ: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        // ตรวจสอบว่ามีผลลัพธ์จาก query หรือไม่
        if (results.length === 0) {
            res.status(404).send('ไม่พบข่าวสำหรับหมวดหมู่ที่ชื่นชอบ');
        } else {
            res.json(results);
        }
    });
});

// ดึงชื่อหมวดหมู่โปรดที่สมาชิกเลือกไว้บนแอป
router.get('/:memId', (req, res) => {
    const memId = req.params.memId;
    pool.query('SELECT * FROM Favorite_Category WHERE Mem_Id = ?', [memId], (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการเรียกหมวดหมู่ที่ชื่นชอบ: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});

// อัปเดตหมวดหมู่โปรดบนแอป
router.post('/update', (req, res) => {
    const { Mem_Id, Cat_Ids } = req.body;

    const deleteQuery = 'DELETE FROM Favorite_Category WHERE Mem_Id = ?';
    const insertQuery = 'INSERT INTO Favorite_Category (Mem_Id, Cat_Id) VALUES ?';
    //สร้าง array สำหรับรับ value ของ mem_id กับ cat_id สำหรับการเพิ่มหมวดหมู่โปรดแต่ละรายการ
    const values = Cat_Ids.map(catId => [Mem_Id, catId]);

    //error handle การลบ
    pool.query(deleteQuery, [Mem_Id], (deleteError) => {
        if (deleteError) {
            console.error('เกิดข้อผิดพลาดในการลบข้อมูลหมวดหมู่โปรดเก่า: ', deleteError);
            return res.status(500).json({ error: 'ไม่สามารถลบข้อมูลหมวดหมู่โปรดเก่า' });
        }

    //error handle การเพิ่ม
        if (values.length > 0) { // ตรวจสอบว่ามีค่า catId ใน array
            pool.query(insertQuery, [values], (insertError) => {
                if (insertError) {
                    console.error('เกิดข้อผิดพลาดในการแทรกรายการโปรดใหม่: ', insertError);
                    return res.status(500).json({ error: 'ไม่สามารถแทรกรายการโปรดใหม่' });
                }

                res.status(200).json({ message: 'อัปเดตรายการโปรดเรียบร้อยแล้ว' });
            });
        } else {
            res.status(200).json({ message: 'ไม่มีหมวดหมู่ที่จะเพิ่ม' }); // ถ้าไม่มีหมวดหมู่ให้เพิ่ม
        }
    });
});

// router.put('/', (req, res) => {
//     const { Mem_Id, Cat_Ids } = req.body;

//     const deleteQuery = 'DELETE FROM Favorite_Category WHERE Mem_Id = ?';
//     pool.query(deleteQuery, [Mem_Id], (deleteError, deleteResults) => {
//         if (deleteError) {
//             console.error('เกิดข้อผิดพลาดในการลบหมวดหมู่ที่ชื่นชอบ: ', deleteError);
//             res.status(500).json({ error: deleteError.toString() });
//             return;
//         }

//         const insertQuery = 'INSERT INTO Favorite_Category (Mem_Id, Cat_Id) VALUES ?';
//         const values = Cat_Ids.map(catId => [Mem_Id, catId]);

//         pool.query(insertQuery, [values], (insertError, insertResults) => {
//             if (insertError) {
//                 console.error('เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่ที่ชื่นชอบ: ', insertError);
//                 res.status(500).json({ error: insertError.toString() });
//                 return;
//             }
//             res.status(201).json({ message: 'อัปเดตหมวดหมู่รายการโปรดสำเร็จแล้ว' });
//         });
//     });
// });

module.exports = router;