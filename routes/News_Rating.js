const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM News_Rating', (error, results) => {
      if (error) {
        console.error('Error fetching News Rating: ', error);
        res.status(500).send('Internal Server Error');
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
        res.status(201).send('News Rating added successfully.');
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
          return res.status(404).send('No News Rating found with the specified member and news ID.');
      }
      res.send('News Rating updated successfully.');
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
          return res.status(404).send('No News Rating found with the specified member and news ID.');
      }
      res.send('News Rating deleted successfully.');
  });
});



module.exports = router;
