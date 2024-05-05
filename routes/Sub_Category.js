const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Sub_Category', (error, results) => {
      if (error) {
        console.error('Error fetching Sub Category: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  router.post('/', (req, res) => {
    const { Sub_Cat_Name, Cat_Id } = req.body;
    const query = 'INSERT INTO Sub_Category (Sub_Cat_Id, Sub_Cat_Name, Cat_Id) VALUES (NULL, ?, ?)';
    pool.query(query, [Sub_Cat_Name, Cat_Id], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        res.status(201).send('Sub Category added successfully.');
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Sub_Cat_Name, Cat_Id } = req.body;
  const query = 'UPDATE Sub_Category SET Sub_Cat_Name = ?, Cat_Id = ? WHERE Sub_Cat_Id = ?';
  pool.query(query, [Sub_Cat_Name, Cat_Id, id], (error, results) => {
      if (error) {
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No Sub Category found with the specified ID.');
      }
      res.send('Sub Category updated successfully.');
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Sub_Category WHERE Sub_Cat_Id = ?';
  pool.query(query, [id], (error, results) => {
      if (error) {
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No Sub Category found with the specified ID.');
      }
      res.send('Sub Category deleted successfully.');
  });
});


module.exports = router;
