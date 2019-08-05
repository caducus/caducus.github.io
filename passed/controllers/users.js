// ==========================
// Dependencies
// ==========================

const express = require("express");
const users = express.Router();
const User = require("../models/users.js");

// ==========================
// Get Routes
// ==========================

users.get("/new", (req, res) => {
  res.render("users/new.ejs")
});

// ==========================
// Post Routes
// ==========================

users.post("/", (req, res) => {
  User.create(req.body, (error, createdUser) => {
    if (error) {
      console.log(error);
    } else {
      console.log(createdUser);
      res.redirect("/")
    };
  });
});

module.exports = users;
