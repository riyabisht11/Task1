const express = require("express");
const router = express.Router();
const taskControllers = require("../controllers/taskControllers");

router.post("/tasks", taskControllers.createTask);
router.get("/tasks", taskControllers.getAllTasks);
router.get("/tasks/:id", taskControllers.getTaskById);

router.put("/tasks/:id", taskControllers.updateTask);
router.delete("/tasks/:id", taskControllers.deleteTask);

module.exports = router;
