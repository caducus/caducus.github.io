const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
  username: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  studentName: {type: String, require: true, unique: true},
  studentID: {type: String, require: true, unique: true},
  isAdmin: {type: Boolean, default: false}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
