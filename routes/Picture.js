const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Picture', (error, results) => {
      if (error) {
        console.error('Error fetching Picture: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  router.post('/', (req, res) => {
    const { News_Id, News_Pic } = req.body;
    const query = 'INSERT INTO Picture (News_Id, News_Pic) VALUES (?, ?)';
    pool.query(query, [News_Id, News_Pic], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        res.status(201).send('Picture added successfully.');
    });
});

router.delete('/:newsId/:newsPic', (req, res) => {
  const { newsId, newsPic } = req.params;
  const query = 'DELETE FROM Picture WHERE News_Id = ? AND News_Pic = ?';
  pool.query(query, [newsId, newsPic], (error, results) => {
      if (error) {
          console.error('Error deleting Picture: ', error);
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No Picture found with the specified news ID and picture.');
      }
      res.send('Picture deleted successfully.');
  });
});



module.exports = router;
