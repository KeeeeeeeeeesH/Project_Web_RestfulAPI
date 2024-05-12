const express = require('express');
const router = express.Router();
const pool = require('../app');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // กำหนดไดเร็กทอรีเก็บไฟล์
  },
  filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      cb(null, `${Date.now()}.${ext}`); // ตั้งชื่อไฟล์ใหม่เพื่อหลีกเลี่ยงชื่อซ้ำ
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  } else {
      cb(new Error('Only JPEG and PNG images are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// router.post('/upload', upload.array('newsPictures', 10), (req, res) => {
//   if (req.files.length > 0) {
//       const values = req.files.map(file => [req.body.News_Id, file.filename]);

//       const query = 'INSERT INTO Picture (News_Id, News_Pic) VALUES ?';
//       pool.query(query, [values], (error, results) => {
//           if (error) {
//               res.status(500).send(`Error uploading images: ${error.toString()}`);
//               return;
//           }
//           res.status(201).send(`${req.files.length} images uploaded successfully!`);
//       });
//   } else {
//       res.status(400).send('No images to upload.');
//   }
// });

router.post('/upload', upload.array('newsPictures', 10), (req, res) => {
  const { News_Id } = req.body;

  // ตรวจสอบว่ามี News_Id นี้อยู่ในฐานข้อมูลหรือไม่
  pool.query('SELECT News_Id FROM News WHERE News_Id = ?', [News_Id], (error, results) => {
    if (error) {
      res.status(500).send(`Error checking news: ${error.toString()}`);
      return;
    }
    if (results.length === 0) {
      res.status(404).send(`News with ID ${News_Id} not found.`);
      return;
    }

    // ถ้ามี News_Id นี้ จึงทำการอัพโหลดรูปภาพ
    if (req.files.length > 0) {
        const values = req.files.map(file => [News_Id, file.filename]);
        const query = 'INSERT INTO Picture (News_Id, News_Pic) VALUES ?';
        pool.query(query, [values], (uploadError, uploadResults) => {
            if (uploadError) {
                res.status(500).send(`Error uploading images: ${uploadError.toString()}`);
                return;
            }
            res.status(201).send(`${req.files.length} images uploaded successfully!`);
        });
    } else {
        res.status(400).send('No images to upload.');
    }
  });
});


router.get('/', (req, res) => {
    pool.query('SELECT * FROM Picture', (error, results) => {
      if (error) {
        console.error('Error fetching Picture: ', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });

  router.post('/', (req, res) => {
    const { News_Id, News_Pic } = req.body;
    const query = 'INSERT INTO Picture (News_Id, News_Pic) VALUES (?, ?)';
    pool.query(query, [News_Id, News_Pic], (error, results) => {
      if (error) {
        res.status(500).send(error.toString());
        return;
      }
      res.status(201).send('Picture added successfully.');
    });
  });
  
  router.delete('/:newsId/:newsPic', (req, res) => {
    const { newsId, newsPic } = req.params;
    const path = require('path');
    const filePath = path.join(__dirname, '..','uploads', newsPic);

    pool.query('DELETE FROM Picture WHERE News_Id = ? AND News_Pic = ?', [newsId, newsPic], (err, results) => {
        if (err) {
            console.error('Error deleting picture:', err);
            res.status(500).send(err.message);
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('No picture found.');
            return;
        }
        fs.unlink(filePath, (fsErr) => {
            if (fsErr) {
                console.error('Error deleting file:', fsErr);
                res.status(500).send(fsErr.message);
                return;
            }
            res.send('Picture deleted successfully.');
        });
    });
});



module.exports = router;
