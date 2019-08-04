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
  SkillEntry.find({}, (error, foundSkills) => {
    res.render("index.ejs", {
      allSkills: foundSkills
    });
  });
});

router.get("/new", (req, res) => {
  res.render("new.ejs");
});

router.get("/:id", (req, res) => {
  SkillEntry.findById(req.params.id, (error, foundEntry) => {
    res.render("show.ejs", {
      thisEntry: foundEntry
    });
  });
});

// ==========================
// Post Route
// ==========================

router.post("/", (req, res) => {
  SkillEntry.create(req.body, (error, createdEntry) => {
    res.redirect("/student");
  });
});

// ==========================
// Put Route
// ==========================

// ==========================
// Delete Route
// ==========================

module.exports = router;
