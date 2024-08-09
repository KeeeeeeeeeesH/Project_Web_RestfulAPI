const express = require('express');
const router = express.Router();
const pool = require('../app');

router.get('/:memId', (req, res) => {
  const memId = req.params.memId;
  pool.query('SELECT * FROM Read_Later WHERE Mem_Id = ?', [memId], (error, results) => {
    if (error) {
      console.error('Error fetching Read Later: ', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

router.get('/ids', (req, res) => {
    const ids = req.query.ids.split(',').map(id => parseInt(id, 10)); // การจัดการ ids
    const query = 'SELECT * FROM News WHERE News_Id IN (?)';
    pool.query(query, [ids], (error, results) => {
        if (error) {
            console.error('Error fetching news by IDs: ', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('ไม่พบข่าวนี้');
        } else {
            res.json(results);
        }
    });
});



router.post('/', (req, res) => {
  const { Mem_Id, News_Id } = req.body;

  // ตรวจสอบว่าข่าวอยู่ในรายการอ่านภายหลังหรือไม่
  const checkQuery = 'SELECT * FROM Read_Later WHERE Mem_Id = ? AND News_Id = ?';
  pool.query(checkQuery, [Mem_Id, News_Id], (checkError, checkResults) => {
      if (checkError) {
          console.error('Error checking Read Later status: ', checkError);
          res.status(500).json({ error: checkError.toString() });
          return;
      }

      if (checkResults.length > 0) {
          // ถ้าข่าวอยู่ในรายการแล้ว ให้ลบออก
          const deleteQuery = 'DELETE FROM Read_Later WHERE Mem_Id = ? AND News_Id = ?';
          pool.query(deleteQuery, [Mem_Id, News_Id], (deleteError, deleteResults) => {
              if (deleteError) {
                  console.error('Error removing from Read Later: ', deleteError);
                  res.status(500).json({ error: deleteError.toString() });
                  return;
              }
              res.json({ message: 'ลบข่าวอ่านภายหลังสำเร็จ' });
          });
      } else {
          // ถ้าข่าวยังไม่อยู่ในรายการ ให้เพิ่มเข้าไป
          const insertQuery = 'INSERT INTO Read_Later (Mem_Id, News_Id) VALUES (?, ?)';
          pool.query(insertQuery, [Mem_Id, News_Id], (insertError, insertResults) => {
              if (insertError) {
                console.error('Error adding to Read Later: ', insertError);
                res.status(500).json({ error: insertError.toString() });
                return;
            }
            res.status(201).json({ message: 'เพิ่มข่าวอ่านภายหลังสำเร็จ' });
        });
    }
});
});

module.exports = router;

