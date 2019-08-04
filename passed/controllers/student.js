// ==========================
// Dependencies
// ==========================

const express = require("express");
const router = express.Router();

const SkillEntry = require("../models/skillEntry.js");
const skillEntrySeed = require("../models/skillEntrySeed.js");

// ==========================
// Seed
// ==========================

router.get("/seed", (req, res) => {
  SkillEntry.create(skillEntrySeed, (error, data) => {
    res.redirect("/student");
  });
});

// ==========================
// Get Routes
// ==========================

router.get("/", (req, res) => {
  res.render("index.ejs");
});

// ==========================
// Post Route
// ==========================

// ==========================
// Put Route
// ==========================

// ==========================
// Delete Route
// ==========================

module.exports = router;
