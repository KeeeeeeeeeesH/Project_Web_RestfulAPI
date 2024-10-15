const express = require("express");
const router = express.Router();
const pool = require("../app");

router.post("/login", (req, res) => {
  const { login, password } = req.body;
  
  let sql = `SELECT admin.*, work_status.adm_status 
            FROM admin 
            LEFT JOIN work_status ON admin.adm_id = work_status.adm_id 
            WHERE (admin.adm_username = ? OR admin.adm_email = ?) AND admin.adm_password = ?`;

  pool.query(sql, [login, login, password], (err, results) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ดูแลระบบ: ", err);
      return res.status(500).json({ message: "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ message: "ข้อมูลที่ใช้ล็อคอินไม่ถูกต้อง" });
    }

    const admin = results[0];

    if (admin.adm_status !== 1) {
      return res.status(403).json({ message: "ไม่ได้อยู่ในสถานะผู้ดูแลระบบ" });
    }
    req.session.isLoggedIn = true;
    req.session.adminId = admin.Adm_Id;
    res.json({ success: true, message: "เข้าสู่ระบบสำเร็จ" });
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "ข้อผิดพลาดเซิร์ฟเวอร์ภายใน" });
    }
    res.json({ success: true, message: "ออกจากระบบสำเร็จ" });
  });
});


module.exports = router;
