const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Total_Read', (error, results) => {
      if (error) {
        console.error('Error fetching Total Read: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  router.post('/', (req, res) => {
    const { News_Id } = req.body;
    const query = 'INSERT INTO Total_Read (Count_Id, News_Id) VALUES (NULL, ?)';
    pool.query(query, [News_Id], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        res.status(201).send('Total Read record added successfully.');
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { News_Id } = req.body;
  const query = 'UPDATE Total_Read SET News_Id = ? WHERE Count_Id = ?';
  pool.query(query, [News_Id, id], (error, results) => {
      if (error) {
          console.error('Error updating Total Read record: ', error);
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No Total Read record found with the specified ID.');
      }
      res.send('Total Read record updated successfully.');
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Total_Read WHERE Count_Id = ?';
  pool.query(query, [id], (error, results) => {
      if (error) {
          console.error('Error deleting Total Read record: ', error);
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No Total Read record found with the specified ID.');
      }
      res.send('Total Read record deleted successfully.');
  });
});


module.exports = router;
