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
    const {  firstname, lastname, username , email , password, phonenumber } = req.body;
    
    const query = 'INSERT INTO admin (Adm_Id, Adm_Fname, Adm_Lname, Adm_Username, Adm_Email, Adm_Password, Adm_Phone) VALUES (NULL, ?, ?, ?, ?, ?, ?)';
    pool.query(query, [ firstname, lastname, username, email, password, phonenumber], function(error, results) {
      if (error) {
        res.status(500).send(error.toString());
      } else {
        res.status(201).send('Admin added successfully.');
      }
    });
  });

  router.delete('/:id', function(req, res) {
    const { id } = req.params;  
  
    if (!id) {
        return res.status(400).send('ID is required for deletion.');
    }
  
    const query = 'DELETE FROM admin WHERE Adm_Id = ?';
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

  router.put('/:id', function(req, res) {
    const { id } = req.params;  // Get the ID from the URL parameter
    const { firstname, lastname, username, email, password, phonenumber } = req.body;
  
    const query = 'UPDATE admin SET Adm_Fname = ?, Adm_Lname = ?, Adm_Username = ?, Adm_Email = ?, Adm_Password = ?, Adm_Phone = ? WHERE Adm_Id = ?';
    pool.query(query, [firstname, lastname, username, email, password, phonenumber, id], function(error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No admin found with the specified ID.');
        }
        res.send('Admin updated successfully.');
    });
  });
  
module.exports = router;
