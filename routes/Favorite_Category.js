const express = require('express');
const router = express.Router();
const pool = require('../app');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM Favorite_Category', (error, results) => {
      if (error) {
        console.error('Error fetching Favorite_Category: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
});

router.get('/news', (req, res) => {
    const { memId } = req.query;

    const query = `
        SELECT n.* FROM News n
        INNER JOIN Favorite_Category fc ON fc.Cat_Id = n.Cat_Id
        WHERE fc.Mem_Id = ?
    `;
    pool.query(query, [memId], (error, results) => {
        if (error) {
            console.error('Error fetching favorite category news: ', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        // ตรวจสอบว่ามีผลลัพธ์จาก query หรือไม่
        if (results.length === 0) {
            res.status(404).send('No news found for favorite categories');
        } else {
            res.json(results);
        }
    });
});

// API เพื่อดึงหมวดหมู่โปรดที่ผู้ใช้เลือกไว้
router.get('/:memId', (req, res) => {
    const memId = req.params.memId;
    pool.query('SELECT * FROM Favorite_Category WHERE Mem_Id = ?', [memId], (error, results) => {
        if (error) {
            console.error('Error fetching favorite categories: ', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

router.post('/update', (req, res) => {
    const { Mem_Id, Cat_Ids } = req.body;

    const deleteQuery = 'DELETE FROM Favorite_Category WHERE Mem_Id = ?';
    const insertQuery = 'INSERT INTO Favorite_Category (Mem_Id, Cat_Id) VALUES ?';
    const values = Cat_Ids.map(catId => [Mem_Id, catId]);

    pool.query(deleteQuery, [Mem_Id], (deleteError) => {
        if (deleteError) {
            console.error('Error deleting old favorites: ', deleteError);
            return res.status(500).json({ error: 'Failed to delete old favorites' });
        }

        if (values.length > 0) { // ตรวจสอบว่ามีค่า catId ใน array
            pool.query(insertQuery, [values], (insertError) => {
                if (insertError) {
                    console.error('Error inserting new favorites: ', insertError);
                    return res.status(500).json({ error: 'Failed to insert new favorites' });
                }

                res.status(200).json({ message: 'Favorites updated successfully' });
            });
        } else {
            res.status(200).json({ message: 'No categories to add' }); // ถ้าไม่มีหมวดหมู่ให้เพิ่ม
        }
    });
});

// API เพื่ออัปเดตหมวดหมู่โปรด
router.put('/', (req, res) => {
    const { Mem_Id, Cat_Ids } = req.body;

    const deleteQuery = 'DELETE FROM Favorite_Category WHERE Mem_Id = ?';
    pool.query(deleteQuery, [Mem_Id], (deleteError, deleteResults) => {
        if (deleteError) {
            console.error('Error deleting favorite categories: ', deleteError);
            res.status(500).json({ error: deleteError.toString() });
            return;
        }

        const insertQuery = 'INSERT INTO Favorite_Category (Mem_Id, Cat_Id) VALUES ?';
        const values = Cat_Ids.map(catId => [Mem_Id, catId]);

        pool.query(insertQuery, [values], (insertError, insertResults) => {
            if (insertError) {
                console.error('Error adding favorite categories: ', insertError);
                res.status(500).json({ error: insertError.toString() });
                return;
            }
            res.status(201).json({ message: 'Favorite categories updated successfully' });
        });
    });
});

module.exports = router;