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
    const { id, name} = req.body;
    const query = 'INSERT INTO category (Cat_Id, Cat_Name ) VALUES (?, ?)';
  
    pool.query(query, [id, name], function(error, results) {
      if (error) {
        res.status(500).send(error.toString());
      } else {
        res.status(201).send('Category added successfully.');
      }
    });
  });
  
  router.delete('/:id', function(req, res) {
    const { id } = req.params;  
  
    if (!id) {
        return res.status(400).send('ID is required for deletion.');
    }
  
    const query = 'DELETE FROM category WHERE Cat_Id = ?';
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
  
  router.put('/:id', function(req, res) {
    const { id } = req.params;  // Get the ID from the URL parameter
    const { name } = req.body;
  
    const query = 'UPDATE category SET Cat_Name = ? WHERE Cat_Id = ?';
    pool.query(query, [name, id], function(error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No category found with the specified ID.');
        }
        res.send('Category updated successfully.');
    });
  });
module.exports = router;
