const Task = require("../models/task");
const mongoose = require("mongoose");

// get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.status(200).json({ tasks: tasks });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// get a single task
const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task dont find" });
  }

  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ error: "Task dont find" });
  }
  return res.status(200).json(task);
};

// create new task
const createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      priority,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// delete task
const deleteTask =  async (req , res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task dont find" });
  }

  const task = await Task.findByIdAndDelete({_id: id})
  if (!task) {
    return res.status(404).json({ error: "Task dont find" });
  }

  res.status(200).json({message: 'Task deleted' , task})
}

//update a task

const updateWorkout = async (req , res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task dont find" });
  }

  const task = await Task.findOneAndUpdate({_id: id} , {
    ...req.body
  })
  if (!task) {
    return res.status(404).json({ error: "Task dont find" });
  }
  res.status(200).json({message: 'Task updated' , task})
}

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  deleteTask,
  updateWorkout
};
