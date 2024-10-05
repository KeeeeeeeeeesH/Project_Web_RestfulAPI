const express = require('express');
const router = express.Router();
const pool = require('../app');
const { sendNotification, sendNotificationToFavoriteUsers } = require('../fcmNotifier');

router.get('/', (req, res) => {
    pool.query('SELECT n.News_Id, n.News_Name, n.News_Details, n.Date_Added, n.Cat_Id, GROUP_CONCAT(nsc.Sub_Cat_Id) AS Sub_Cat_Ids, n.Major_Id FROM News n LEFT JOIN News_Sub_Cate nsc ON n.News_Id = nsc.News_Id GROUP BY n.News_Id', (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข่าว: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
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
    let { News_Name, News_Details, Date_Added, Cat_Id, Sub_Cat_Ids, Major_Id } = req.body;

    if (Date_Added) {
        Date_Added = new Date(Date_Added);
    } else {
        Date_Added = new Date();
    }

    const query = 'INSERT INTO News (News_Name, News_Details, Date_Added, Cat_Id, Major_Id) VALUES (?, ?, ?, ?, ?)';
    pool.query(query, [News_Name, News_Details, Date_Added, Cat_Id, Major_Id], async (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการเพิ่มข่าว: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }

        const newsId = results.insertId;

        if (Sub_Cat_Ids && Sub_Cat_Ids.length > 0) {
            const values = Sub_Cat_Ids.map(subCatId => [newsId, subCatId]);
            const subCatQuery = 'INSERT INTO News_Sub_Cate (News_Id, Sub_Cat_Id) VALUES ?';
            pool.query(subCatQuery, [values], (subCatError, subCatResults) => {
                if (subCatError) {
                    console.error('เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่ย่อย: ', subCatError);
                    res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
                    return;
                }
            });
        }

        // แจ้งเตือนเฉพาะข่าวสำคัญ (Major_Id = 2)
        if (Major_Id == 2) {
            console.log("Major_Id is 2, กำลังเตรียมส่งการแจ้งเตือน...");
            sendNotification('แจ้งเตือนข่าวระดับความสำคัญสูง', News_Name, 'news_topic', newsId);
        } else {
            // ถ้าไม่ใช่ข่าวสำคัญ ให้ตรวจสอบหมวดหมู่โปรดของสมาชิก
            await sendNotificationToFavoriteUsers(News_Name, Cat_Id, newsId, pool);
        }

        res.status(201).send('เพิ่มข้อมูลข่าวสำเร็จ');
    });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    let { News_Name, News_Details, Date_Added, Cat_Id, Major_Id, Sub_Cat_Ids } = req.body;

    if (Date_Added) {
        Date_Added = new Date(Date_Added);
    } else {
        Date_Added = new Date();
    }

    try {
        // ดึง Major_Id เดิมเพื่อเปรียบเทียบ
        const [rows] = await pool.promise().query('SELECT Major_Id FROM News WHERE News_Id = ?', [id]);
        const previousMajorId = rows.length > 0 ? rows[0].Major_Id : null;

        console.log(`Previous Major ID: ${previousMajorId}`);
        console.log(`New Major ID: ${Major_Id}`);

        await pool.promise().query('UPDATE News SET News_Name = ?, News_Details = ?, Date_Added = ?, Cat_Id = ?, Major_Id = ? WHERE News_Id = ?',
            [News_Name, News_Details, Date_Added, Cat_Id, Major_Id, id]);

        await pool.promise().query('DELETE FROM News_Sub_Cate WHERE News_Id = ?', [id]);

        if (Sub_Cat_Ids && Sub_Cat_Ids.length > 0) {
            const insertValues = Sub_Cat_Ids.map(subCatId => [id, subCatId]);
            await pool.promise().query('INSERT INTO News_Sub_Cate (News_Id, Sub_Cat_Id) VALUES ?', [insertValues]);
        }

        // ส่งการแจ้งเตือนถ้า Major_Id เปลี่ยนจาก 1 เป็น 2
        if (previousMajorId == 1 && Major_Id == 2) {
            console.log('Condition met: previousMajorId == 1 && Major_Id == 2');
            sendNotification('แจ้งเตือนข่าวระดับความสำคัญสูง', News_Name, 'news_topic', id); 
        }

        res.send('แก้ไขข้อมูลข่าวสำเร็จ');
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข่าว: ', error);
        res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
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
            return res.status(404).send('ไม่พบข่าวสารตาม ID ที่ระบุ');
        }
        res.send('ลบข้อมูลข่าวสำเร็จ');
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT n.News_Id, n.News_Name, n.News_Details, n.Date_Added, n.Cat_Id, GROUP_CONCAT(nsc.Sub_Cat_Id) AS Sub_Cat_Ids, n.Major_Id FROM News n LEFT JOIN News_Sub_Cate nsc ON n.News_Id = nsc.News_Id WHERE n.News_Id = ? GROUP BY n.News_Id';
    pool.query(query, [id], (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข่าว: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        if (results.length === 0) {
            return res.status(404).send('ไม่พบข่าวนี้');
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

router.get('/category/:id', (req, res) => {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const offset = page * limit;

    let query = `
        SELECT n.News_Id, n.News_Name, n.Date_Added, n.Cat_Id,
        (SELECT COUNT(*) FROM Total_Read WHERE Total_Read.News_Id = n.News_Id) AS readCount,
        (SELECT AVG(Rating_Score) FROM News_Rating WHERE News_Rating.News_Id = n.News_Id) AS ratingScore
        FROM News n
    `;
    
    if (id != 0) {
        query += `WHERE n.Cat_Id = ? `;
    }

    query += `ORDER BY n.Date_Added DESC LIMIT ? OFFSET ?`;

    const params = id == 0 ? [limit, offset] : [id, limit, offset];

    pool.query(query, params, (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข่าว: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
