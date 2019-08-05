// ==========================
// Dependencies
// ==========================

const express = require("express");
const sessions = express.Router();

// ==========================
// Get Routes
// ==========================

sessions.get("/new", (req, res) => {
  res.render("sessions/new.ejs")
});

module.exports = sessions;
