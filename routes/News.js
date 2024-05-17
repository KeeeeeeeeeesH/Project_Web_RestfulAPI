const express = require('express');
const router = express.Router();
const pool = require('../app');

router.get('/', (req, res) => {
    pool.query('SELECT n.News_Id, n.News_Name, n.News_Details, n.Date_Added, n.Cat_Id, GROUP_CONCAT(nsc.Sub_Cat_Id) AS Sub_Cat_Ids, n.Major_Id FROM News n LEFT JOIN News_Sub_Cate nsc ON n.News_Id = nsc.News_Id GROUP BY n.News_Id', (error, results) => {
        if (error) {
            console.error('Error fetching news:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        results.forEach(news => {
            if (news.Sub_Cat_Ids) {
                const subCatIds = news.Sub_Cat_Ids.split(',');
                news.Sub_Cat_Names = subCatIds.join(', ');
            } else {
                news.Sub_Cat_Names = '';
            }
        });
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { News_Name, News_Details, Date_Added, Cat_Id, Sub_Cat_Ids, Major_Id } = req.body;

    const query = 'INSERT INTO News (News_Name, News_Details, Date_Added, Cat_Id, Major_Id) VALUES (?, ?, ?, ?, ?)';
    pool.query(query, [News_Name, News_Details, Date_Added, Cat_Id, Major_Id], (error, results) => {
        if (error) {
            console.error('Error adding News: ', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        const newsId = results.insertId;

        if (Sub_Cat_Ids && Sub_Cat_Ids.length > 0) {
            const values = Sub_Cat_Ids.map(subCatId => [newsId, subCatId]);
            const subCatQuery = 'INSERT INTO News_Sub_Cate (News_Id, Sub_Cat_Id) VALUES ?';
            pool.query(subCatQuery, [values], (subCatError, subCatResults) => {
                if (subCatError) {
                    console.error('Error adding Sub Categories: ', subCatError);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.status(201).send('News added successfully');
            });
        } else {
            res.status(201).send('News added successfully');
        }
    });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { News_Name, News_Details, Date_Added, Cat_Id, Major_Id, Sub_Cat_Ids } = req.body;

    try {
        await pool.promise().query('UPDATE News SET News_Name = ?, News_Details = ?, Date_Added = ?, Cat_Id = ?, Major_Id = ? WHERE News_Id = ?',
            [News_Name, News_Details, Date_Added, Cat_Id, Major_Id, id]);

        await pool.promise().query('DELETE FROM News_Sub_Cate WHERE News_Id = ?', [id]);

        if (Sub_Cat_Ids && Sub_Cat_Ids.length > 0) {
            const insertValues = Sub_Cat_Ids.map(subCatId => [id, subCatId]);
            await pool.promise().query('INSERT INTO News_Sub_Cate (News_Id, Sub_Cat_Id) VALUES ?', [insertValues]);
        }

        res.send('News updated successfully.');
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).send('Internal Server Error');
    }
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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT n.News_Id, n.News_Name, n.News_Details, n.Date_Added, n.Cat_Id, GROUP_CONCAT(nsc.Sub_Cat_Id) AS Sub_Cat_Ids, n.Major_Id FROM News n LEFT JOIN News_Sub_Cate nsc ON n.News_Id = nsc.News_Id WHERE n.News_Id = ? GROUP BY n.News_Id';
    pool.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error fetching news:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length === 0) {
            return res.status(404).send('News not found');
        }
        const news = results[0];
        if (news.Sub_Cat_Ids) {
            const subCatIds = news.Sub_Cat_Ids.split(',');
            news.Sub_Cat_Ids = subCatIds;
        } else {
            news.Sub_Cat_Ids = [];
        }
        res.json(news);
    });
});



module.exports = router;