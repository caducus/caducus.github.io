const mongoose = require("mongoose");

const skillEntrySchema = new mongoose.Schema ({
  studentID: {type: Number, required: true},
  studentName: {type: String, required: true},
  rotation: {type: String, required: true},
  skill: {type: String, required: true},
  levelOfControl: {type: Number, required: true},
  preceptor: {type: String, required: true}
});

const SkillEntry = mongoose.model("SkillEntry", skillEntrySchema);

module.exports = SkillEntry;
