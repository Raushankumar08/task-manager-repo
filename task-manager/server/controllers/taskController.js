const Task = require("../models/Task");

// ✅ CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ GET ALL TASKS (by project OR all user tasks)
exports.getTasks = async (req, res) => {
  try {
    const filter = {};

    // if project id is passed → filter by project
    if (req.query.project) {
      filter.project = req.query.project;
    }

    const tasks = await Task.find(filter)
      .populate("project", "name")
      .populate("assignedTo", "name email");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};