const express = require("express");
const router = express.Router();
const pool = require("../app");

router.post("/login", (req, res) => {
  const { login, password } = req.body;
  let sql = `SELECT Admin.*, Work_Status.Adm_Status 
               FROM Admin 
               LEFT JOIN Work_Status ON Admin.Adm_Id = Work_Status.Adm_Id 
               WHERE (Admin.Adm_Username = ? OR Admin.Adm_Email = ?) AND Admin.Adm_Password = ?`;

  pool.query(sql, [login, login, password], (err, results) => {
    if (err) {
      console.error("Error fetching admin:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ message: "ข้อมูลที่ใช้ล็อคอินไม่ถูกต้อง" });
    }

    const admin = results[0];

    if (admin.Adm_Status !== 1) {
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
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json({ success: true, message: "ออกจากระบบสำเร็จ" });
  });
});


module.exports = router;
