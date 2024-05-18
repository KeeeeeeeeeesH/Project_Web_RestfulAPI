const express = require('express');
const router = express.Router();
const pool = require('../app');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM Admin', (error, results) => {
        if (error) {
            console.error('Error fetching admin:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

router.post("/", function (req, res) {
    const { Adm_Fname, Adm_Lname, Adm_Username, Adm_Password, Adm_Email, Adm_Phone } = req.body;
    
    if (!/^0\d{9}$/.test(Adm_Phone)) {
        return res.status(400).json({ message: 'Format of Phone Number is Incorrect' });
    }

    const query = 'INSERT INTO Admin (Adm_Id, Adm_Fname, Adm_Lname, Adm_Username, Adm_Password, Adm_Email, Adm_Phone) VALUES (NULL, ?, ?, ?, ?, ?, ?)';
    pool.query(query, [Adm_Fname, Adm_Lname, Adm_Username, Adm_Password, Adm_Email, Adm_Phone], function(error, results) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                if (error.sqlMessage.includes('Adm_Username')) {
                    return res.status(409).json({ message: 'Username already exists' });
                } else if (error.sqlMessage.includes('Adm_Email')) {
                    return res.status(409).json({ message: 'Email already exists' });
                } else if (error.sqlMessage.includes('Adm_Phone')) {
                    return res.status(409).json({ message: 'Phone number already exists' });
                }
            }
            return res.status(500).json({ message: error.toString() });
        }
        res.status(201).json({ message: 'Admin added successfully.' });
    });
});

router.put('/:id', function(req, res) {
    const { id } = req.params;
    const { Adm_Fname, Adm_Lname, Adm_Username, Adm_Email, Adm_Phone } = req.body;

    if (!/^0\d{9}$/.test(Adm_Phone)) {
        return res.status(400).json({ message: 'Format of Phone Number is Incorrect' });
    }

    const query = 'UPDATE Admin SET Adm_Fname = ?, Adm_Lname = ?, Adm_Username = ?, Adm_Email = ?, Adm_Phone = ? WHERE Adm_Id = ?';
    pool.query(query, [Adm_Fname, Adm_Lname, Adm_Username, Adm_Email, Adm_Phone, id], function(error, results) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                if (error.sqlMessage.includes('Adm_Username')) {
                    return res.status(409).json({ message: 'Username already exists' });
                } else if (error.sqlMessage.includes('Adm_Email')) {
                    return res.status(409).json({ message: 'Email already exists' });
                } else if (error.sqlMessage.includes('Adm_Phone')) {
                    return res.status(409).json({ message: 'Phone number already exists' });
                }
            }
            return res.status(500).json({ message: error.toString() });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No admin found with the specified ID.');
        }
        res.json({ message: 'Admin updated successfully.' });
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
        res.json({ message: 'Admin deleted successfully.' });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM Admin WHERE Adm_Id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error fetching admin by ID:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('No admin found with the specified ID.');
        }
    });
});

module.exports = router;
