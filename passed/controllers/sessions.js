// ==========================
// Dependencies
// ==========================

const express = require("express");
const sessions = express.Router();
const User = require("../models/users.js");

// ==========================
// Get Routes
// ==========================

sessions.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// ==========================
// Post Routes
// ==========================

sessions.post("/", (req, res) => {
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if (req.body.password === foundUser.password) {
      req.session.currentUser = foundUser;
      res.redirect("/");
    } else {
      res.send('<a href="/">incorrect password</a>')
    };
  });
});

// ==========================
// Delete Routes
// ==========================

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = sessions;
