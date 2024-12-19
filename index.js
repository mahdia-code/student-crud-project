const express = require("express");
const mongoose = require("mongoose");
const studentModel = require("./studentModel");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// 1. Create a student
app.post("/create", async (req, res) => {
  try {
    const newStudent = new studentModel(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2. Read a single student by ID
app.get("/read/:id", async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. Update a student by ID
app.put("/update/:id", async (req, res) => {
  try {
    const updatedStudent = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. Delete a student by ID
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedStudent = await studentModel.findByIdAndDelete(req.params.id);
    if (!deletedStudent)
      return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully", deletedStudent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Run Server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
