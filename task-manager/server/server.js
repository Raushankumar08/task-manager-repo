require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// =======================
// ✅ MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());


// =======================
// ✅ ROUTES
// =======================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));


// =======================
// ✅ HEALTH CHECK (optional but useful)
// =======================
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});


// =======================
// ✅ DB CONNECTION
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  });


// =======================
// ✅ GLOBAL ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ msg: "Something went wrong" });
});


// =======================
// ✅ SERVER START
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);