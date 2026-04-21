const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    let user = await Student.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);

    user = new Student({ name, email, password: hashed, course });
    await user.save();

    res.json({ msg: "Registered Successfully" });
  } catch {
    res.status(500).send("Server Error");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch {
    res.status(500).send("Server Error");
  }
});

// 🔥 GET STUDENT DETAILS
router.get("/me", auth, async (req, res) => {
  try {
    const user = await Student.findById(req.user).select("-password");
    res.json(user);
  } catch {
    res.status(500).send("Server Error");
  }
});

// UPDATE PASSWORD
router.put("/update-password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await Student.findById(req.user);

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ msg: "Password updated" });
  } catch {
    res.status(500).send("Server Error");
  }
});

// UPDATE COURSE
router.put("/update-course", auth, async (req, res) => {
  try {
    const { course } = req.body;

    const user = await Student.findById(req.user);
    user.course = course;

    await user.save();

    res.json({ msg: "Course updated" });
  } catch {
    res.status(500).send("Server Error");
  }
});

module.exports = router;