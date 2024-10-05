const express = require('express');
const router = express.Router();
const pool = require('../app');

router.get('/news', (req, res) => {
    const query = 'SELECT News.News_Id, News.News_Name, News.Date_Added, News.Cat_Id, News.Major_Id, Category.Cat_Name, Sub_Category.Sub_Cat_Name, Major.Major_Level FROM News LEFT JOIN Category ON News.Cat_Id = Category.Cat_Id LEFT JOIN Sub_Category ON News.Cat_Id = Sub_Category.Cat_Id LEFT JOIN Major ON News.Major_Id = Major.Major_Id';
    pool.promise().query(query)
        .then(([rows]) => {
            let csvData = '\ufeffNews_Id, News_Name, Date_Added, Cat_Id, Major_Id, Cat_Name, Sub_Cat_Name, Major_Level\n'; 
            rows.forEach(row => {
                csvData += `${row.News_Id}, ${row.News_Name}, ${row.Date_Added}, ${row.Cat_Id}, ${row.Major_Id}, ${row.Cat_Name}, ${row.Sub_Cat_Name}, ${row.Major_Level}\n`;
            });
            res.setHeader('Content-Type', 'text/csv; charset=utf-8');
            res.attachment('news.csv');
            res.send(csvData);
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการส่งออกข้อมูลข่าวสาร: ', error);
            res.status(500).json({ error: 'ข้อผิดพลาดเซิร์ฟเวอร์ภายใน' });
        });
});

router.get('/member', (req, res) => {
    const query = `
        SELECT Member.Mem_Id, Member.Mem_Fname, Member.Mem_Lname,
               Read_History.News_Id, Read_History.Read_Date,
               News_Rating.Rating_Score
        FROM Member
        LEFT JOIN Read_History ON Member.Mem_Id = Read_History.Mem_Id
        LEFT JOIN News_Rating ON Member.Mem_Id = News_Rating.Mem_Id AND Read_History.News_Id = News_Rating.News_Id
    `;
    pool.promise().query(query)
        .then(([rows, fields]) => {
            let csvData = 'Mem_Id, Mem_Fname, Mem_Lname, News_Id, Read_Date, Rating_Score\n';
            rows.forEach(row => {
                csvData += `${row.Mem_Id}, ${row.Mem_Fname}, ${row.Mem_Lname}, ${row.News_Id}, ${row.Read_Date}, ${row.Rating_Score}\n`;
            });

            res.setHeader('Content-Type', 'text/csv');
            res.attachment('member.csv');
            res.send(csvData);
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการส่งออกข้อมูลสมาชิก: ', error);
            res.status(500).json({ error: 'ข้อผิดพลาดเซิร์ฟเวอร์ภายใน' });
        });
});

router.get('/admin', (req, res) => {
    const query = `
        SELECT Admin.Adm_Id, Admin.Adm_Fname, Admin.Adm_Lname,
               Work_Status.Adm_Status, Work_Status.Start_Date, Work_Status.End_Date
        FROM Admin
        LEFT JOIN Work_Status ON Admin.Adm_Id = Work_Status.Adm_Id
    `;
    pool.promise().query(query)
        .then(([rows, fields]) => {
            let csvData = 'Adm_Id, Adm_Fname, Adm_Lname, Adm_Status, Start_Date, End_Date\n';
            rows.forEach(row => {
                csvData += `${row.Adm_Id}, ${row.Adm_Fname}, ${row.Adm_Lname}, ${row.Adm_Status}, ${row.Start_Date}, ${row.End_Date}\n`;
            });

            res.setHeader('Content-Type', 'text/csv');
            res.attachment('admin.csv');
            res.send(csvData);
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการส่งออกข้อมูลผู้ดูแลระบบ: ', error);
            res.status(500).json({ error: 'ข้อผิดพลาดเซิร์ฟเวอร์ภายใน' });
        });
});

module.exports = router;
