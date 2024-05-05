const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Work_Status_Detail', (error, results) => {
      if (error) {
        console.error('Error fetching Work Status Detail: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  router.post('/', (req, res) => {
    const { Adm_Id, Status_Id, Start_Date, End_Date } = req.body;
    const query = 'INSERT INTO Work_Status_Detail (Adm_Id, Status_Id, Start_Date, End_Date) VALUES (?, ?, ?, ?)';
    pool.query(query, [Adm_Id, Status_Id, Start_Date, End_Date || null], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        res.status(201).send('Work Status Detail added successfully.');
    });
});

router.put('/:admId', (req, res) => {
  const { admId } = req.params;
  const { Status_Id, Start_Date, End_Date } = req.body;
  const query = 'UPDATE Work_Status_Detail SET Status_Id = ?, Start_Date = ?, End_Date = ? WHERE Adm_Id = ?';
  pool.query(query, [Status_Id, Start_Date, End_Date || null, admId], (error, results) => {
      if (error) {

          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No Work Status Detail found with the specified Admin ID and Status ID.');
      }
      res.send('Work Status Detail updated successfully.');
  });
});

router.delete('/:admId', (req, res) => {
  const { admId } = req.params;
  const query = 'DELETE FROM Work_Status_Detail WHERE Adm_Id = ?';
  pool.query(query, [admId], (error, results) => {
      if (error) {
          res.status(500).send(error.toString());
          return;
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('No Work Status Detail found with the specified Admin ID and Status ID.');
      }
      res.send('Work Status Detail deleted successfully.');
  });
});


module.exports = router;
