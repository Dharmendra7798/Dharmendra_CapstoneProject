const express = require("express");
const Task = require("../models/task");
const router = express.Router();

// ✅ Create a new task
router.post("/", async (req, res) => {
  console.log("📥 Incoming POST /api/tasks body:", req.body);

  try {
    if (!req.body.task) {
      return res.status(400).send({ error: "Field 'task' is required" });
    }

    const newTask = new Task({
      task: req.body.task,
      description: req.body.description || "",
      completed: req.body.completed || false,
    });

    const savedTask = await newTask.save();
    console.log("✅ Task saved:", savedTask);
    res.status(201).send(savedTask);
  } catch (error) {
    console.error("❌ Error creating task:", error);
    res.status(500).send({ error: error.message });
  }
});

// ✅ Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    res.status(500).send({ error: error.message });
  }
});

// ✅ Update a task by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) return res.status(404).send({ error: "Task not found" });
    res.status(200).send(updatedTask);
  } catch (error) {
    console.error("❌ Error updating task:", error);
    res.status(500).send({ error: error.message });
  }
});

// ✅ Delete a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).send({ error: "Task not found" });
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
