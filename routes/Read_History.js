const express = require('express');
const router = express.Router();
const pool = require('../app');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM Read_History', (error, results) => {
        if (error) {
            console.error('Error fetching Read History: ', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

router.get('/:memId', (req, res) => {
    const { memId } = req.params;
    const query = `
        SELECT rh.Mem_Id, rh.News_Id, rh.Read_Date, n.News_Name, IFNULL(AVG(nr.Rating_Score), 0) AS Rating_Score, p.News_Pic AS Cover_Image 
        FROM Read_History rh 
        JOIN News n ON rh.News_Id = n.News_Id 
        LEFT JOIN News_Rating nr ON n.News_Id = nr.News_Id 
        LEFT JOIN Picture p ON n.News_Id = p.News_Id AND p.News_Pic LIKE 'cover_%' 
        WHERE rh.Mem_Id = ? 
        GROUP BY rh.Mem_Id, rh.News_Id, rh.Read_Date, n.News_Id, n.News_Name, p.News_Pic 
        ORDER BY rh.Read_Date DESC`;
    pool.query(query, [memId], (error, results) => {
        if (error) {
            console.error('Error fetching Read History for member: ', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { Mem_Id, News_Id } = req.body;
    const Read_Date = new Date();
    const selectQuery = 'SELECT * FROM Read_History WHERE Mem_Id = ? AND News_Id = ?';
    const insertQuery = 'INSERT INTO Read_History (Mem_Id, News_Id, Read_Date) VALUES (?, ?, ?)';
    const updateQuery = 'UPDATE Read_History SET Read_Date = ? WHERE Mem_Id = ? AND News_Id = ?';

    pool.query(selectQuery, [Mem_Id, News_Id], (selectError, selectResults) => {
        if (selectError) {
            res.status(500).send(selectError.toString());
            return;
        }

        if (selectResults.length > 0) {
            pool.query(updateQuery, [Read_Date, Mem_Id, News_Id], (updateError) => {
                if (updateError) {
                    res.status(500).send(updateError.toString());
                    return;
                }
                res.status(200).send('อัปเดตข้อมูลประวัติการอ่านสำเร็จ');
            });
        } else {
            pool.query(insertQuery, [Mem_Id, News_Id, Read_Date], (insertError) => {
                if (insertError) {
                    res.status(500).send(insertError.toString());
                    return;
                }
                res.status(201).send('เพิ่มข้อมูลประวัติการอ่านสำเร็จ');
            });
        }
    });
});

router.delete('/:memId/:newsId', (req, res) => {
    const { memId, newsId } = req.params;
    const query = 'DELETE FROM Read_History WHERE Mem_Id = ? AND News_Id = ?';
    pool.query(query, [memId, newsId], (error, results) => {
        if (error) {
            console.error('Error deleting Read History: ', error);
            res.status(500).send(error.toString());
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('No Read History found with the specified member and news ID');
        }
        res.send('ลบข้อมูลประวัติการอ่านสำเร็จ');
    });
});

module.exports = router;
