const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Work_Status', (error, results) => {
      if (error) {
        console.error('Error fetching Work Status: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  router.post("/", function (req, res) {
    const { status } = req.body;
    
    const query = 'INSERT INTO work_status (Adm_Status) VALUES (?)';
    pool.query(query, [status], function(error, results) {
      if (error) {
        res.status(500).send(error.toString());
      } else {
        res.status(201).send('work_status added successfully.');
      }
    });
  });
  
  router.delete('/:id', function(req, res) {
    const { id } = req.params;  
  
    if (!id) {
        return res.status(400).send('ID is required for deletion.');
    }
  
    const query = 'DELETE FROM work_status WHERE Status_Id = ?';
    pool.query(query, [id], function(error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No work_status found with the specified ID.');
        }
        res.send('Work_status deleted successfully.');
    });
  });
  
  router.put('/:id', function(req, res) {
    const { id } = req.params;  
    const { status } = req.body;
  
    const query = 'UPDATE work_status SET Adm_Status = ? WHERE Status_Id = ?';
    pool.query(query, [status , id], function(error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No work_status found with the specified ID.');
        }
        res.send('Work_status updated successfully.');
    });
  });
module.exports = router;
