const express = require('express');
const router = express.Router();
const pool = require('../app');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM News_Sub_Cate', (error, results) => {
        if (error) {
            console.error('Error fetching news sub categories:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { News_Name, News_Details, Date_Added, Cat_Id, Sub_Cat_Ids, Major_Id } = req.body;
    
    const updateNewsQuery = 'UPDATE News SET News_Name = ?, News_Details = ?, Date_Added = ?, Cat_Id = ?, Major_Id = ? WHERE News_Id = ?';
    pool.query(updateNewsQuery, [News_Name, News_Details, Date_Added, Cat_Id, Major_Id, id], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No News found with the specified ID');
        }

        const deleteSubCategoriesQuery = 'DELETE FROM News_Sub_Cate WHERE News_Id = ?';
        pool.query(deleteSubCategoriesQuery, [id], (deleteError, deleteResults) => {
            if (deleteError) {
                res.status(500).send(deleteError.toString());
                return;
            }

            if (Sub_Cat_Ids && Sub_Cat_Ids.length > 0) {
                const values = Sub_Cat_Ids.map(subCatId => [id, subCatId]);
                const insertQuery = 'INSERT INTO News_Sub_Cate (News_Id, Sub_Cat_Id) VALUES ?';
                pool.query(insertQuery, [values], (insertError, insertResults) => {
                    if (insertError) {
                        res.status(500).send(insertError.toString());
                        return;
                    }
                    res.send('แก้ไข News_Sub_Cate สำเร็จ');
                });
            } else {
                res.send('แก้ไข News ID สำเร็จ');
            }
        });
    });
});

router.get('/:catId', (req, res) => {
    const { catId } = req.params;
    const query = 'SELECT * FROM Sub_Category WHERE Cat_Id = ?';
    pool.query(query, [catId], (error, results) => {
        if (error) {
            console.error('Error fetching sub categories:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// Fetch news sub categories by news ID
router.get('/tag/:newsId', (req, res) => {
    const newsId = req.params.newsId;
    pool.query('SELECT * FROM News_Sub_Cate WHERE News_Id = ?', [newsId], (error, results) => {
        if (error) {
            console.error('Error fetching news sub categories:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
