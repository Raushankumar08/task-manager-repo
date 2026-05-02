const Task = require("../models/Task");


// ================= CREATE =================
exports.createTask = async (req, res) => {
  try {
    const { title, assignedTo, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title required" });
    }

    // 🔒 Only admin can assign
    if (assignedTo && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can assign" });
    }

    const task = await Task.create({
      title,
      assignedTo: assignedTo || null,
      priority,
      dueDate,
      createdBy: req.user.id,
    });

    const populated = await Task.findById(task._id)
      .populate("assignedTo", "name email");

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ================= GET =================
exports.getTasks = async (req, res) => {
  try {
    const { mode } = req.query;

    let filter = {};

    // 👤 Member → only their tasks
    if (mode === "my") {
      filter.assignedTo = req.user.id;
    }

    // 👑 Admin → all tasks
    if (mode === "all" && req.user.role === "admin") {
      filter = {};
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ================= UPDATE =================
exports.updateTask = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Not found" });

    // 🔒 Only assigned user OR admin
    if (
      req.user.role !== "admin" &&
      task.assignedTo?.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    task.status = status || task.status;

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// ================= DELETE =================
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Not found" });

    // 🔒 Admin OR creator
    if (
      req.user.role !== "admin" &&
      task.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await task.deleteOne();

    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};