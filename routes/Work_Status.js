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
    const { Adm_Id, Adm_Status, Start_Date, End_Date } = req.body;
    const query = 'INSERT INTO Work_Status (Adm_Id, Adm_Status, Start_Date, End_Date) VALUES (?, ?, ?, ?)';
    pool.query(query, [Adm_Id, Adm_Status, Start_Date, End_Date], function(error, results) {
      if (error) {
        res.status(500).send(error.toString());
      } else {
        res.status(201).send('work_status added successfully.');
      }
    });
  });
  
  router.put('/:Adm_Id', function(req, res) {
    const { Adm_Id } = req.params;  
    const { Adm_Status, Start_Date, End_Date } = req.body;
  
    const query = 'UPDATE Work_Status SET Adm_Status = ?, Start_Date = ?, End_Date = ? WHERE Adm_Id = ?';
    pool.query(query, [ Adm_Status, Start_Date, End_Date || null, Adm_Id], (error, results) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No work_status found with the specified ID.');
        }
        res.send('Work_status updated successfully.');
    });
  });

  router.delete('/:Adm_Id', (req, res) => {
    const { Adm_Id } = req.params;
    const query = 'DELETE FROM Work_Status WHERE Adm_Id = ?';
    pool.query(query, [Adm_Id], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No Work Status found with the specified Admin ID and Status ID.');
        }
        res.send('Work Status deleted successfully.');
    });
  });
  
module.exports = router;
