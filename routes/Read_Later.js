const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Read_Later', (error, results) => {
      if (error) {
        console.error('Error fetching Read Later: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  router.post('/', (req, res) => {
    const { Mem_Id, News_Id } = req.body;
    const query = 'INSERT INTO Read_Later (Mem_Id, News_Id) VALUES (?, ?)';
    pool.query(query, [Mem_Id, News_Id], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        res.status(201).send('เพิ่มข่าวอ่านภายหลังสำเร็จ');
    });
});

router.delete('/', (req, res) => {
  const { Mem_Id, News_Id } = req.body;
  const query = 'DELETE FROM Read_Later WHERE Mem_Id = ? AND News_Id = ?';
  pool.query(query, [Mem_Id, News_Id], (error, results) => {
      if (error) {
          console.error('Error removing from Read Later: ', error);
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No entry found in Read Later with the specified member and news ID');
      }
      res.send('ลบข่าวอ่านภายหลังสำเร็จ');
  });
});


module.exports = router;
