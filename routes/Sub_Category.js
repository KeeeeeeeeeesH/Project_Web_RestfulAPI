const express = require('express');
const router = express.Router();
const pool = require('../app');
  
router.get('/', (req, res) => {
    const { catId } = req.query;
    let query = 'SELECT * FROM Sub_Category';
    let queryParams = [];

    if (catId) {
        query += ' WHERE Cat_Id = ?';
        queryParams.push(catId);
    }

    pool.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Error fetching sub categories:', error);
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
        res.status(201).send('เพิ่มหมวดหมู่รองสำเร็จ');
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
          return res.status(404).send('No Sub Category found with the specified ID');
      }
      res.send('แก้ไขหมวดหมู่รองสำเร็จ');
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
          return res.status(404).send('No Sub Category found with the specified ID');
      }
      res.send('ลบหมวดหมู่รองสำเร็จ');
  });
});

router.get('/:id', (req, res) => {
    const subCatId = req.params.id;
    pool.query('SELECT * FROM Sub_Category WHERE Sub_Cat_Id = ?', [subCatId], (error, results) => {
        if (error) {
            console.error('Error fetching sub category by ID:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('No sub category found with the specified ID');
        }
    });
});

// Get subcategories by IDs
// router.get('/tag/ids', (req, res) => {
//     const ids = req.query.ids.split(',').map(id => parseInt(id, 10));
//     pool.query('SELECT * FROM Sub_Category WHERE Sub_Cat_Id IN (?)', [ids], (error, results) => {
//         if (error) {
//             return res.status(500).json({ error: error.message });
//         }
//         if (results.length === 0) {
//             return res.status(404).send('No sub category found with the specified ID');
//         }
//         res.json(results);
//     });
// });

router.get('/tag/ids', (req, res) => {
    let ids = req.query.ids;
    // ตรวจสอบว่า ids เป็น array หรือไม่ ถ้าไม่ใช่ให้แปลงเป็น array
    if (!Array.isArray(ids)) {
        ids = ids.split(',').map(id => parseInt(id, 10));
    } else {
        ids = ids.map(id => parseInt(id, 10)); // แปลงแต่ละค่าใน array เป็นตัวเลข
    }
    console.log('Parsed IDs:', ids); // Log parsed IDs
    pool.query('SELECT * FROM Sub_Category WHERE Sub_Cat_Id IN (?)', [ids], (error, results) => {
        if (error) {
            console.error('Database error:', error); // Log database error
            return res.status(500).json({ error: error.message });
        }
        if (results.length === 0) {
            console.log('No results found for IDs:', ids); // Log if no results found
            return res.status(404).send('No sub category found with the specified ID');
        }
        console.log('Query results:', results); // Log results
        res.json(results);
    });
});



module.exports = router;
