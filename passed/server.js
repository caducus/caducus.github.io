// =========================
// Dependencies
// =========================

const express = require("express");
const mongoose = require("mongoose");
const methodOverride  = require('method-override');
const session = require("express-session");

require('dotenv').config();

const sessionsController = require("./controllers/sessions.js");
const studentController = require("./controllers/student.js");
const userController = require("./controllers/users.js");

const app = express();
const db = mongoose.connection;

// =========================
// Global Configuration
// =========================

const port = process.env.PORT;
const mongoURI = process.env.MONGOD_URI;

mongoose.connect(mongoURI, {userNewUrlParser: true}, () => {
  console.log("The connection with MongoDB is established.");
});

// ===========================
// Fix Depreciation Warnings
// ===========================

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// ===========================
// Error / Success Messages
// ===========================

db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));


// ===========================
// Middleware
// ===========================

app.use(express.static("./public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use("/sessions", sessionsController);
app.use("/student", studentController);
app.use("/users", userController);

// ===========================
// Get Routes
// ===========================

app.get("/", (req, res) => {
  res.render("index.ejs", {
    currentUser: req.session.currentUser
  });
});

// app.get("/student", (req, res) => {
//   if (req.session.currentUser) {
//     res.render("student/index.ejs");
//   } else {
//     res.redirect("/sessions/new");
//   };
// });

// ===========================
// Listener
// ===========================

app.listen(port, () => {
  console.log("I'm totes listenin' on port: ", port);
});
