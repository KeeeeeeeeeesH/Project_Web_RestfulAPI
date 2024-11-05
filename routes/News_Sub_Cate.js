const express = require('express');
const router = express.Router();
const pool = require('../app');

//แสดงข้อมูล
router.get('/', (req, res) => {
    pool.query('SELECT * FROM News_Sub_Cate', (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่ย่อยข่าว: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});

//แก้ไขแท็กข่าวขากไอดีข่าว
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { News_Name, News_Details, Date_Added, Cat_Id, Sub_Cat_Ids, Major_Id } = req.body;
    
    //เพิ่มแท็กข่าวจากแท็กเดิมที่มี
    const updateNewsQuery = 'UPDATE News SET News_Name = ?, News_Details = ?, Date_Added = ?, Cat_Id = ?, Major_Id = ? WHERE News_Id = ?';
    pool.query(updateNewsQuery, [News_Name, News_Details, Date_Added, Cat_Id, Major_Id, id], (error, results) => {
        if (error) {
            res.status(500).send(error.toString());
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('ไม่พบข่าวสารตาม ID ที่ระบุ');
        }
    
        //ลบแท็กข่าวออกจากข่าวทั้งหมด
        const deleteSubCategoriesQuery = 'DELETE FROM News_Sub_Cate WHERE News_Id = ?';
        pool.query(deleteSubCategoriesQuery, [id], (deleteError, deleteResults) => {
            if (deleteError) {
                res.status(500).send(deleteError.toString());
                return;
            }

            //หากไม่มีแท็กข่าวในข่าวนั้นๆแต่แรก ให้ทำการเพิ่มแท็กข่าว
            if (Sub_Cat_Ids && Sub_Cat_Ids.length > 0) {
                //ใช้ map สร้าง array ของชุดข้อมูล ถ้าเพิ่มหลายแท็กข่าว
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

// ดึงแท็กตามไอดีข่าว
router.get('/tag/:newsId', (req, res) => {
    const newsId = req.params.newsId;
    pool.query('SELECT * FROM News_Sub_Cate WHERE News_Id = ?', [newsId], (error, results) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่ย่อยข่าว: ', error);
            res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
            return;
        }
        res.json(results);
    });
});

// router.get('/:catId', (req, res) => {
//     const { catId } = req.params;
//     const query = 'SELECT * FROM Sub_Category WHERE Cat_Id = ?';
//     pool.query(query, [catId], (error, results) => {
//         if (error) {
//             console.error('เกิดข้อผิดพลาดในการเรียกหมวดหมู่ย่อย: ', error);
//             res.status(500).send('ข้อผิดพลาดเซิร์ฟเวอร์ภายใน');
//             return;
//         }
//         res.json(results);
//     });
// });


module.exports = router;
