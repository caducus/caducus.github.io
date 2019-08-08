// ==========================
// Dependencies
// ==========================

const express = require("express");
const router = express.Router();

const SkillEntry = require("../models/skillEntry.js");
const skillEntrySeed = require("../models/skillEntrySeed.js");

const sessionsController = require("./sessions.js");

// ==========================
// Middleware
// ==========================

router.use("/sessions", sessionsController);

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
  if (req.session.currentUser.isAdmin === true) {
    SkillEntry.find({}, (error, foundStudents) => {
      res.render("admin/index.ejs", {
        allStudents: foundStudents
      });
    });
  } else if (req.session.currentUser) {
    SkillEntry.find({studentID: req.session.currentUser.studentID}, (error, foundSkills) => {
      res.render("student/index.ejs", {
        allSkills: foundSkills
      });
    });
  } else {
    res.redirect("/sessions/new");
  };
});

router.get("/new", (req, res) => {
  if (req.session.currentUser) {
    res.render("student/new.ejs", {
      thisUser: req.session.currentUser,
    });
  } else {
    res.redirect("/sessions/new");
  };
});

router.get("/:id", (req, res) => {
  if (req.session.currentUser) {
    SkillEntry.findById(req.params.id, (error, foundEntry) => {
      res.render("student/show.ejs", {
        thisEntry: foundEntry
      });
    });
  } else {
    res.redirect("/sessions/new");
  };
});

router.get("/:id/edit", (req, res) => {
  if (req.session.currentUser) {
    SkillEntry.findById(req.params.id, (error, foundEntry) => {
      res.render("student/edit.ejs", {
        thisUser: req.session.currentUser,
        thisEntry: foundEntry
      });
    });
  } else {
    res.redirect("/sessions/new");
  };
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
