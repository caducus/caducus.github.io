const mongoose = require("mongoose");

const skillEntrySchema = new mongoose.Schema ({
  studentID: {type: String, required: true},
  rotation: {type: String, required: true},
  skill: {type: String, required: true},
  levelOfControl: {type: Number, required: true},
  preceptor: {type: String, required: true}
});

const SkillEntry = mongoose.model("Skill-Entry", skillEntrySchema);

module.exports = SkillEntry;
