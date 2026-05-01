const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// CREATE PROJECT (ADMIN ONLY)
router.post("/", auth, role("admin"), async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      owner: req.user.id,
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: "Error creating project" });
  }
});

// GET PROJECTS
router.get("/", auth, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;