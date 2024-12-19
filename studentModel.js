const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    rollNumber: { type: String, required: true },
    phoneNumber: { type: String },
    password: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const studentModel = mongoose.model("students", DataSchema);

module.exports = studentModel;
