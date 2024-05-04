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

module.exports = router;
