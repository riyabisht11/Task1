const path = require("path");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const fs = require("fs");

const LOG_FILE = path.join(__dirname, "../logs/apidocumentation.txt"); // Log file path

const logAPI = (req, res, next) => {
  const logEntry = `${req.method} ${req.url} ${res.statusCode}\n`;
  fs.appendFile(LOG_FILE, logEntry, (err) => {
    if (err) console.error("Error logging API:", err);
  });
  next(); // Ensure next() is called to avoid request hanging
};

const createTask = async (req, res, next) => {
  try {
    const task = new Task(req.body); // ✅ Use lowercase "task"
    logAPI(req, res, next);
     task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    logAPI(req, res, next);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    logAPI(req, res, next);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    logAPI(req, res, next);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
