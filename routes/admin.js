const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    pool.query('SELECT * FROM Admin', (error, results) => {
      if (error) {
        console.error('Error fetching admin: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  router.post("/", function (req, res) {
    const {  firstname, lastname, username , password, email, phonenumber } = req.body;
    const query = 'INSERT INTO Admin (Adm_Id, Adm_Fname, Adm_Lname, Adm_Username, Adm_Password, Adm_Email, Adm_Phone) VALUES (NULL, ?, ?, ?, ?, ?, ?)';
    pool.query(query, [ firstname, lastname, username, password, email, phonenumber], function(error, results) {
      if (error) {
        res.status(500).send(error.toString());
      } else {
        res.status(201).send('Admin added successfully.');
      }
    });
  });

  router.put('/:id', function(req, res) {
    const { id } = req.params;  // Get the ID from the URL parameter
    const { firstname, lastname, username , password, email, phonenumber } = req.body;
  
    const query = 'UPDATE Admin SET Adm_Fname = ?, Adm_Lname = ?, Adm_Username = ?, Adm_Password = ?, Adm_Email = ?, Adm_Phone = ? WHERE Adm_Id = ?';
    pool.query(query, [firstname, lastname, username , password, email, phonenumber, id], function(error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No admin found with the specified ID.');
        }
        res.send('Admin updated successfully.');
        console.log(req.body,req.params);
    });
  });

  router.delete('/:id', function(req, res) {
    const { id } = req.params;  
  
    if (!id) {
        return res.status(400).send('ID is required for deletion.');
    }
  
    const query = 'DELETE FROM Admin WHERE Adm_Id = ?';
    pool.query(query, [id], function(error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No admin found with the specified ID.');
        }
        res.send('Admin deleted successfully.');
    });
  });


  
  
module.exports = router;
