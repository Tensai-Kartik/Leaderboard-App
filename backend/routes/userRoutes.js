const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET: Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST: Add a new user
router.post("/add", async (req, res) => {
  const { name } = req.body;
  try {
    const newUser = new User({ name, totalPoints: 0 });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
});

// POST: Claim random points for a user
router.post("/claim", async (req, res) => {
  const { userId } = req.body;
  const randomPoints = Math.floor(Math.random() * 21) + 10; // 10–30
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.totalPoints += randomPoints;
    await user.save();

    res.json({ name: user.name, points: randomPoints });
  } catch (err) {
    res.status(500).json({ error: "Failed to claim points" });
  }
});

// GET: Leaderboard sorted by totalPoints
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ totalPoints: -1 });

    const ranked = leaderboard.map((user, index) => ({
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1,
    }));

    res.json(ranked);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// POST: Reset leaderboard (set all totalPoints to 0)
router.post("/reset", async (req, res) => {
  try {
    await User.updateMany({}, { $set: { totalPoints: 0 } });
    res.json({ message: "Leaderboard reset successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to reset leaderboard" });
  }
});

// POST: Seed demo users
router.post("/seed", async (req, res) => {
  const demoNames = ["Sahil", "Riya", "Jay", "Tina", "Dev"];
  try {
    const existing = await User.find({}, "name");
    const existingNames = existing.map((u) => u.name);

    const newUsers = demoNames
      .filter((name) => !existingNames.includes(name))
      .map((name) => ({ name, totalPoints: 0 }));

    if (newUsers.length === 0) {
      return res.json({ message: "Demo users already exist." });
    }

    await User.insertMany(newUsers);
    res.json({ message: "Demo users seeded successfully", users: newUsers });
  } catch (err) {
    res.status(500).json({ error: "Failed to seed demo users" });
  }
});

// 🗑️ Delete all users
router.delete("/deleteAll", async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete users" });
  }
});

module.exports = router;
