const express = require("express");
const router = express.Router();
const pool = require("../app");
const path = require("path");

// Middleware to check if user is logged in
const checkAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
};

// Middleware to redirect logged-in users away from login page
const redirectIfLoggedIn = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/dashboard");
  }
  next();
};

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
        .json({ message: "Username or email and password do not match." });
    }

    const admin = results[0];

    if (admin.Adm_Status !== 1) {
      return res.status(403).json({ message: "ไม่ได้อยู่ในสถานะผู้ดูแลระบบ" });
    }

    req.session.isLoggedIn = true;
    req.session.adminId = admin.Adm_Id;
    res.json({ success: true, message: "Login successful" });
  });
});
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json({ success: true, message: "Logout successful" });
  });
});

router.get("/login", redirectIfLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.get("/dashboard", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/dashboard.html"));
});

router.get("/admin", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin.html"));
});

router.get("/recovery", redirectIfLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/recovery.html"));
});

router.get("/news_sub_cate", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/news_sub_cate.html"));
});

router.get("/major", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/major.html"));
});

router.get("/member", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/member.html"));
});

router.get("/favorite_category", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/favorite_category.html"));
});

router.get("/read_later", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/read_later.html"));
});

router.get("/read_history", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/read_history.html"));
});

router.get("/news", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/news.html"));
});

router.get("/total_read", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/total_read.html"));
});

router.get("/picture", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/picture.html"));
});

router.get("/news_sub_cate", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/news_sub_cate.html"));
});

router.get("/news_rating", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/news_rating.html"));
});

router.get('/work_status', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/work_status.html'));
});

module.exports = router;
