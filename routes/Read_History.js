const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Read_History', (error, results) => {
      if (error) {
        console.error('Error fetching Read History: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  router.post('/', (req, res) => {
    const { Mem_Id, News_Id } = req.body;
    const Read_Date = new Date();  // กำหนดให้เป็นเวลาปัจจุบัน
    const query = 'INSERT INTO Read_History (Mem_Id, News_Id, Read_Date) VALUES (?, ?, ?)';
    pool.query(query, [Mem_Id, News_Id, Read_Date], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        res.status(201).send('เพิ่มข้อมูลประวัติการอ่านสำเร็จ');
    });
});

router.delete('/:memId/:newsId', (req, res) => {
  const { memId, newsId } = req.params;
  const query = 'DELETE FROM Read_History WHERE Mem_Id = ? AND News_Id = ?';
  pool.query(query, [memId, newsId], (error, results) => {
      if (error) {
          console.error('Error deleting Read History: ', error);
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No Read History found with the specified member and news ID');
      }
      res.send('ลบข้อมูลประวัติการอ่านสำเร็จ');
  });
});


module.exports = router;
