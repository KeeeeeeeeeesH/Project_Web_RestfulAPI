const express = require("express");
const router = express.Router();
const pool = require("../app");

router.post('/login', (req, res) => {
    const { login, password } = req.body;

    const query = 'SELECT * FROM Member WHERE (Mem_Username = ? OR Mem_Email = ?) AND Mem_Password = ?';
    pool.query(query, [login, login, password], (error, results) => {
        if (error) {
            console.error("Error fetching member:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length > 0) {
            return res.status(200).json({ success: true, user: results[0] });
        } else {
            return res.status(401).json({ success: false, message: 'Username or email and password do not match' });
        }
    });
});

module.exports = router;
