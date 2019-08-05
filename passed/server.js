// =========================
// Dependencies
// =========================

const express = require("express");
const methodOverride  = require('method-override');
const mongoose = require("mongoose");

const studentController = require("./controllers/student.js");

const app = express();
const db = mongoose.connection;

// =========================
// Global Configuration
// =========================

const port = 3000;
const mongoURI = "mongodb://localhost:27017/" + "passed";

mongoose.connect(mongoURI, {userNewUrlParser: true}, () => {
  console.log("The connection with MongoDB is established.");
});

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
app.use("/student", studentController);

// ===========================
// Get Routes
// ===========================

app.get("/", (req, res) => {
  res.render("index.ejs")
});

// ===========================
// Listener
// ===========================

app.listen(port, () => {
  console.log("I'm totes listenin' on port: " + port);
});
