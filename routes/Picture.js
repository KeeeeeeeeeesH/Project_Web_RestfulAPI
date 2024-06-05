const express = require('express');
const router = express.Router();
const pool = require('../app');
const multer = require('multer');
const fs = require('fs');

// Generate a short random string for filenames
function generateShortFilename() {
    return Math.random().toString(36).substring(2, 10); // 8 characters
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // กำหนดไดเร็กทอรีเก็บไฟล์
  },
  filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      const isCover = file.fieldname === 'coverImage';
      const randomName = generateShortFilename();
      const filename = isCover ? `cover_${randomName}.${ext}` : `${randomName}.${ext}`;
      cb(null, filename); // ตั้งชื่อไฟล์ใหม่เพื่อหลีกเลี่ยงชื่อซ้ำ
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  } else {
      cb(new Error('อนุญาตให้อัพโหลดเฉพาะไฟล์ .jpg และ .png เท่านั้น'), false);
  }
};

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

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/upload', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'contentImages', maxCount: 10 }]), (req, res) => {
  const { News_Id } = req.body;

  pool.query('SELECT News_Id FROM News WHERE News_Id = ?', [News_Id], (error, results) => {
      if (error) {
          res.status(500).json({ success: false, message: `Error checking news: ${error.toString()}` });
          return;
      }
      if (results.length === 0) {
          res.status(404).json({ success: false, message: `News with ID ${News_Id} not found.` });
          return;
      }

      const coverFiles = req.files.coverImage || [];
      const contentFiles = req.files.contentImages || [];

      // Check for existing cover image
      pool.query('SELECT * FROM Picture WHERE News_Id = ? AND News_Pic LIKE "cover_%"', [News_Id], (error, results) => {
          if (error) {
              res.status(500).json({ success: false, message: `Error checking existing cover image: ${error.toString()}` });
              return;
          }
          if (results.length > 0 && coverFiles.length > 0) {
              res.status(400).json({ success: false, message: 'ไม่สามารถเพิ่มรูปหน้าปกซ้ำได้ กรุณาลบรูปภาพเดิมออกก่อน.' });
              return;
          }
          if (coverFiles.length > 1) {
              res.status(400).json({ success: false, message: 'You can only upload one cover image.' });
              return;
          }

          if (coverFiles.length > 0 && !coverFiles[0].originalname.startsWith('cover_')) {
              res.status(400).json({ success: false, message: 'Cover image filename must start with "cover_".' });
              return;
          }

          uploadFiles(req, res, News_Id, coverFiles, contentFiles);
      });
  });
});

function uploadFiles(req, res, News_Id, coverFiles, contentFiles) {
  const allFiles = [...coverFiles, ...contentFiles];
  if (allFiles.length > 0) {
      const values = allFiles.map(file => [News_Id, file.filename]);
      const query = 'INSERT INTO Picture (News_Id, News_Pic) VALUES ?';
      pool.query(query, [values], (uploadError, uploadResults) => {
          if (uploadError) {
              res.status(500).json({ success: false, message: `Error uploading images: ${uploadError.toString()}` });
              return;
          }
          res.status(201).json({ success: true, message: `${allFiles.length} images uploaded successfully!` });
      });
  } else {
      res.status(400).json({ success: false, message: 'No images to upload' });
  }
}

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
            res.send('ลบรูปภาพสำเร็จ');
        });
    });
});

router.get('/news/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM Picture WHERE News_Id = ?', [id], (error, results) => {
      if (error) {
        console.error('Error fetching pictures for news:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });


module.exports = router;
