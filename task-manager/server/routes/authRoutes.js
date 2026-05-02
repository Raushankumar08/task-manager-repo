const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =======================
// ✅ SIGNUP
// =======================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🔒 Validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "member", // 🔥 default role
    });

    res.status(201).json({
      msg: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// =======================
// ✅ LOGIN
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔒 Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Email & password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // 🔥 better
    );

    res.json({
      token,
      user: {
        id: user._id, // 🔥 important for assigning tasks
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// =======================
// ✅ GET USERS (for assign dropdown)
// =======================
router.get("/users", async (req, res) => {
  try {
    const users = await User.find()
      .select("_id name email role")
      .sort({ name: 1 });

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;