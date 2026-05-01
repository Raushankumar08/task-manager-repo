const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// =========================
// CREATE TASK
// =========================
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      assignedTo: req.body.assignedTo,
      dueDate: req.body.dueDate,
      status: "todo",
    });

    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Create task failed" });
  }
});

// =========================
// GET TASKS
// =========================
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Fetch failed" });
  }
});

// =========================
// UPDATE TASK (IMPORTANT)
// =========================
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
});

module.exports = router;