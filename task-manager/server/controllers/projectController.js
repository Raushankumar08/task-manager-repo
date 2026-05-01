const Project = require("../models/Project");

// create project (admin only)
exports.createProject = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Only admin can create project" });
  }

  const project = await Project.create({
    ...req.body,
    owner: req.user.id
  });

  res.json(project);
};

// get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user.id
    });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};