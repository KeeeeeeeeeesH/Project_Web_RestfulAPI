const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Favorite_Category', (error, results) => {
      if (error) {
        console.error('Error fetching Favorite_Category: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  router.post('/', (req, res) => {
    const { Mem_Id, Cat_Id } = req.body;
    const query = 'INSERT INTO Favorite_Category (Mem_Id, Cat_Id) VALUES (?, ?)';
    pool.query(query, [Mem_Id, Cat_Id], (error, results) => {
        if (error) {
            console.error('Error adding Favorite Category: ', error);
            return;
        }
        res.status(201).send('Favorite Category added successfully.');
    });
});

router.delete('/', (req, res) => {
  const { Mem_Id, Cat_Id } = req.body;
  const query = 'DELETE FROM Favorite_Category WHERE Mem_Id = ? AND Cat_Id = ?';
  pool.query(query, [Mem_Id, Cat_Id], (error, results) => {
      if (error) {
          console.error('Error deleting Favorite Category: ', error);
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No Favorite Category found with the specified member and category ID.');
      }
      res.send('Favorite Category deleted successfully.');
  });
});


module.exports = router;
