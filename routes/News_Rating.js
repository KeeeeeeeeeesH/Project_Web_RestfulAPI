const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM News_Rating', (error, results) => {
      if (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลการให้คะแนนข่าวสาร: ', error);
        res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
        return;
      }
      res.json(results);
    });
  });

  router.post('/', (req, res) => {
    const { Mem_Id, News_Id, Rating_Score } = req.body;
    const query = 'INSERT INTO News_Rating (Mem_Id, News_Id, Rating_Score) VALUES (?, ?, ?)';
    pool.query(query, [Mem_Id, News_Id, Rating_Score], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        res.status(201).send('เพิ่มข้อมูลคะแนนข่าวสำเร็จ');
    });
});

router.put('/:memId/:newsId', (req, res) => {
  const { memId, newsId } = req.params;
  const { Rating_Score } = req.body;
  const query = 'UPDATE News_Rating SET Rating_Score = ? WHERE Mem_Id = ? AND News_Id = ?';
  pool.query(query, [Rating_Score, memId, newsId], (error, results) => {
      if (error) {
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          // ถ้าไม่มี record ในฐานข้อมูล, ให้ทำการ insert แทน
          const insertQuery = 'INSERT INTO News_Rating (Mem_Id, News_Id, Rating_Score) VALUES (?, ?, ?)';
          pool.query(insertQuery, [memId, newsId, Rating_Score], (insertError, insertResults) => {
              if (insertError) {
                  res.status(500).send(insertError.toString());
                  return;
              }
              res.status(201).send('เพิ่มข้อมูลคะแนนข่าวสำเร็จ');
          });
      } else {
          res.send('แก้ไขเพิ่มข้อมูลคะแนนข่าวสำเร็จ');
      }
  });
});

router.delete('/:memId/:newsId', (req, res) => {
  const { memId, newsId } = req.params;
  const query = 'DELETE FROM News_Rating WHERE Mem_Id = ? AND News_Id = ?';
  pool.query(query, [memId, newsId], (error, results) => {
      if (error) {
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('ไม่พบการให้คะแนนข่าวกับสมาชิกที่ระบุและรหัสข่าว');
      }
      res.send('ลบข้อมูลคะแนนข่าวสำเร็จ');
  });
});



module.exports = router;
