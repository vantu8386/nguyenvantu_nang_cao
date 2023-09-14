const express = require("express");
const router = express.Router();
const db = require("../utils/database");
const { route } = require("./auth.routes");

router.get("/", async (req, res) => {
  try {
    const dataTodo = await db.execute("SELECT * FROM tasks");
    let [rows] = dataTodo;
    res.status(200).json({
      message: "Lấy thành công",
      works: rows,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

router.post("/", async (req, res) => {
  const { name, status = 0 } = req.body;
  try {
    const dataTodo = await db.execute(
      "INSERT INTO tasks (name, status) VALUES (?, ?)",
      [name, status]
    );
    let [rows] = dataTodo;
    res.json({
      message: "success",
      dataTodo: rows,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

router.put("/complete/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const dataTodo = await db.execute(
      "UPDATE tasks SET name = ?, status = 1 WHERE id = ?",
      [name, id]
    );

    if (dataTodo[0].affectedRows > 0) {
      res.json({
        message: `Cập nhật công việc thành công id: ${id}`,
      });
    } else {
      res.status(404).json({
        message: `Không tìm thấy công việc có id: ${id}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.put("/unfinished/:id", async (req, res) => {
  const id = req.params.id;
  const { name,  } = req.body;

  try {
    const dataTodo = await db.execute(
      "UPDATE tasks SET name = ?, status = 0 WHERE id = ?",
      [name, id]
    );

    if (dataTodo[0].affectedRows > 0) {
      res.json({
        message: `Cập nhật công việc thành công id: ${id}`,
      });
    } else {
      res.status(404).json({
        message: `Không tìm thấy công việc có id: ${id}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.execute("DELETE FROM tasks WHERE id = ?", [id]);

    if (result[0].affectedRows > 0) {
      res.json({
        message: "Công việc đã được xóa thành công",
      });
    } else {
      res.status(404).json({
        message: "Không tìm thấy công việc với ID đã cung cấp",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
