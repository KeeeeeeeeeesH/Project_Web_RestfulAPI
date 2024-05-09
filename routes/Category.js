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
  
  router.get('/categories_with_sub', (req, res) => {
    const query = `
    SELECT Category.Cat_Id, Category.Cat_Name, Sub_Category.Sub_Cat_Id, Sub_Category.Sub_Cat_Name 
    FROM Category
    LEFT JOIN Sub_Category ON Category.Cat_Id = Sub_Category.Cat_Id
    ORDER BY Category.Cat_Id, Sub_Category.Sub_Cat_Id`;

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching combined Category and Sub Category data: ', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

  // GET a specific admin by ID
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM category WHERE Cat_Id  = ?', [id], (error, results) => {
        if (error) {
            console.error('Error fetching category by ID:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('No category found with the specified ID.');
        }
    });
  });

module.exports = router;
