const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Category', (error, results) => {
      if (error) {
        console.error('Error fetching Category: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  router.post("/", function (req, res) {
    const { Cat_Name } = req.body;
    const query = 'INSERT INTO Category (Cat_Id, Cat_Name ) VALUES (NULL, ?)';
  
    pool.query(query, [Cat_Name], function(error, results) {
      if (error) {
        res.status(500).send(error.toString());
      } else {
        res.status(201).send('Category added successfully.');
      }
    });
  });

  router.put('/:id', function(req, res) {
    const { id } = req.params;  // Get the ID from the URL parameter
    const { Cat_Name } = req.body;
  
    const query = 'UPDATE Category SET Cat_Name = ? WHERE Cat_Id = ?';
    pool.query(query, [Cat_Name, id], function(error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No category found with the specified ID.');
        }
        res.send('Category updated successfully.');
    });
  });

  router.delete('/:id', function(req, res) {
    const { id } = req.params;  
  
    if (!id) {
        return res.status(400).send('ID is required for deletion.');
    }
    const query = 'DELETE FROM Category WHERE Cat_Id = ?';
    pool.query(query, [id], function(error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No category found with the specified ID.');
        }
        res.send('Category deleted successfully.');
    });
  });
module.exports = router;
