const express = require("express");
const router = express.Router();
const db = require("../utils/database");

const users = [
  { id: 1, username: "admin", password: "123123", role_id: 1 },
  { id: 2, username: "user", password: "123123", role_id: 2 },
];

router.get("/", async (req, res) => {
  try {
    const username = await db.execute("SELECT * FROM Users");
    res.status(200).json({
      message: "Lấy thành công",
      username: username[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ message: "Tên người dùng không tồn tại" });
  }

  if (user.password === password) {
    return res.json({ message: "Đăng nhập thành công", user });
  } else {
    return res.status(401).json({ message: "Sai mật khẩu" });
  }
});

module.exports = router;
