const express = require("express");
const {
  createTask,
  getAllTasks,
  getTask,
  deleteTask,
  updateWorkout
} = require("../controllers/taskControllers");

const router = express.Router();

//GET all tasks
router.get("/", getAllTasks);

//GET a single task
router.get("/:id", getTask);

// POST a new task
router.post("/", createTask);

// DELETE task
router.delete("/:id", deleteTask);

// UPDATE a new task
router.patch("/:id", updateWorkout);

module.exports = router;
