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
    res.render("student/index.ejs", {
      allSkills: foundSkills
    });
  });
});

router.get("/new", (req, res) => {
  res.render("student/new.ejs");
});

router.get("/:id", (req, res) => {
  SkillEntry.findById(req.params.id, (error, foundEntry) => {
    res.render("student/show.ejs", {
      thisEntry: foundEntry
    });
  });
});

router.get("/:id/edit", (req, res) => {
  SkillEntry.findById(req.params.id, (error, foundEntry) => {
    res.render("student/edit.ejs", {
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

router.put("/:id", (req, res) => {
  SkillEntry.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedEntry) => {
    res.redirect("/student");
  });
});

// ==========================
// Delete Route
// ==========================

router.delete("/:id", (req, res) => {
  SkillEntry.findByIdAndRemove(req.params.id, (error, foundEntry) => {
    res.redirect("/student");
  });
});

module.exports = router;
