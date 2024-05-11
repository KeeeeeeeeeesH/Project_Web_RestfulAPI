const express = require('express');
const router = express.Router();
const pool = require('../app');
const multer = require('multer'); 
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      cb(null, Date.now() + '.' + ext);
    }
  });
  
  const upload = multer({ storage: storage });
  
  router.post('/', upload.array('newsPictures'), (req, res) => {
    const { News_Name, News_Details, Date_Added, Cat_Id, Major_Id } = req.body;
    const newsPics = req.files.map(file => file.filename); 
  
    const query = 'INSERT INTO News (News_Id, News_Name, News_Details, Date_Added, Cat_Id, Major_Id) VALUES (NULL, ?, ?, ?, ?, ?)';
    pool.query(query, [News_Name, News_Details, Date_Added, Cat_Id, Major_Id], (error, results) => {
      if (error) {
        res.status(500).send(error.toString());
        return;
      }
      if (!results.insertId) {
        res.status(500).send('Failed to add new news.');
        return;
      }
  
      const picValues = newsPics.map(pic => [results.insertId, pic]);
      const picQuery = 'INSERT INTO Picture (News_Id, News_Pic) VALUES ?';
      pool.query(picQuery, [picValues], (picError, picResults) => {
        if (picError) {
          res.status(500).send(picError.toString());
          return;
        }
        res.status(201).send('News added successfully.');
      });
    });
  });
  
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { News_Name, News_Details, Cat_Id, Major_Id } = req.body;
    const query = 'UPDATE News SET News_Name = ?, News_Details = ?, Cat_Id = ?, Major_Id = ? WHERE News_Id = ?';
    pool.query(query, [News_Name, News_Details, Cat_Id, Major_Id, id], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No News found with the specified ID.');
        }
        res.send('News updated successfully.');
    });
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM News WHERE News_Id = ?';
    pool.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No News found with the specified ID.');
        }
        res.send('News deleted successfully.');
      });
    });

    router.get('/', (req, res) => {
        pool.query('SELECT * FROM News', (error, results) => {
          if (error) {
            console.error('Error fetching News: ', error);
            res.status(500).send('Internal Server Error');
            return;
          }
          res.json(results);
        });
      });
  
  module.exports = router;