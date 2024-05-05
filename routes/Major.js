const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Major', (error, results) => {
      if (error) {
        console.error('Error fetching Major: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  router.post("/", function (req, res) {
    const { Level } = req.body;
    const query = 'INSERT INTO major (Major_Level) VALUES (?)';
    pool.query(query, [ Level ], function(error, results) {
      if (error) {
        res.status(500).send(error.toString());
      } else {
        res.status(201).send('Major added successfully.');
      }
    });
  });
  
  router.delete('/:id', function(req, res) {
    const { id } = req.params;  
 
    const query = 'DELETE FROM major WHERE Major_Id = ?';
    pool.query(query, [id], function(error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No Major found with the specified ID.');
        }
        res.send('Major deleted successfully.');
    });
  });
  
  router.put('/:id', function(req, res) {
    const { id } = req.params;  // Get the ID from the URL parameter
    const { Level } = req.body;
  
    const query = 'UPDATE major SET Major_Level = ? WHERE Major_Id = ?';
    pool.query(query, [Level ,id], function(error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No major found with the specified ID.');
        }
        res.send('Major updated successfully.');
    });
  });
  
module.exports = router;
