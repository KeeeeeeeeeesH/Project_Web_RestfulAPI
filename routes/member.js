const express = require('express');
const router = express.Router();
const pool = require('../app');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM Member', (error, results) => {
        if (error) {
            console.error('Error fetching Member:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

router.post("/", function (req, res) {
  const { Mem_Fname, Mem_Lname, Mem_Username, Mem_Password, Mem_Email, Mem_Phone, Mem_Status } = req.body;
  
  if (!/^0\d{9}$/.test(Mem_Phone)) {
      return res.status(400).json({ message: 'Format of Phone Number is Incorrect' });
  }
  
  const query = 'INSERT INTO Member (Mem_Id, Mem_Fname, Mem_Lname, Mem_Username, Mem_Password, Mem_Email, Mem_Phone, Mem_Status) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)';
  pool.query(query, [Mem_Fname, Mem_Lname, Mem_Username, Mem_Password, Mem_Email, Mem_Phone, Mem_Status], function(error, results) {
      if (error) {
          if (error.code === 'ER_DUP_ENTRY') {
              if (error.sqlMessage.includes('Mem_Username')) {
                  return res.status(409).json({ message: 'Username already exists' });
              } else if (error.sqlMessage.includes('Mem_Email')) {
                  return res.status(409).json({ message: 'Email already exists' });
              } else if (error.sqlMessage.includes('Mem_Phone')) {
                  return res.status(409).json({ message: 'Phone number already exists' });
              }
          }
          return res.status(500).json({ message: error.toString() });
      }
      res.status(201).json({ message: 'Member added successfully.' });
  });
});

router.delete('/:id', function (req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('ID is required for deletion.');
    }

    const query = 'DELETE FROM Member WHERE Mem_Id = ?';
    pool.query(query, [id], function (error, results) {
        if (error) {
            return res.status(500).send(error.toString());
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No member found with the specified ID.');
        }
        res.send('Member deleted successfully.');
    });
});

router.put('/:id', function (req, res) {
    const { id } = req.params;
    const { Mem_Fname, Mem_Lname, Mem_Username, Mem_Email, Mem_Phone, Mem_Status } = req.body;

    if (!/^0\d{9}$/.test(Mem_Phone)) {
        return res.status(400).json({ message: 'Format of Phone Number is Incorrect' });
    }

    const query = 'UPDATE Member SET Mem_Fname = ?, Mem_Lname = ?, Mem_Username = ?, Mem_Email = ?, Mem_Phone = ?, Mem_Status = ? WHERE Mem_Id = ?';
    pool.query(query, [Mem_Fname, Mem_Lname, Mem_Username, Mem_Email, Mem_Phone, Mem_Status, id], function (error, results) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                if (error.sqlMessage.includes('Mem_Username')) {
                    return res.status(409).json({ message: 'Username already exists' });
                } else if (error.sqlMessage.includes('Mem_Email')) {
                    return res.status(409).json({ message: 'Email already exists' });
                } else if (error.sqlMessage.includes('Mem_Phone')) {
                    return res.status(409).json({ message: 'Phone number already exists' });
                }
            }
            return res.status(500).json({ message: error.toString() });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No member found with the specified ID.');
        }
        res.json({ message: 'Member updated successfully.' });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM Member WHERE Mem_Id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error fetching member by ID:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('No member found with the specified ID.');
        }
    });
});

module.exports = router;
