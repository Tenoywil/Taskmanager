const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const moment = require("moment");
const Task = require("../../models/Task");
const User = require("../../models/User");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    Task api/task
// @desc     Create a Task
// @access   Private
router.post(
  "/",
  auth,
  check("text", "text is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      function makeId(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      const newTask = new Task({
        text: req.body.text,
        taskId: makeId(6),
        dueDate: moment(req.body.dueDate).format("LL"),
        name: user.name,
        user: req.user.id,
        assigner: req.user.id,
        assignee: null,
      });

      const task = await newTask.save();

      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route    GET api/task
// @desc     Get all tasks
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/task/:id
// @desc     Get task by ID
// @access   Private
router.get("/:id", auth, checkObjectId("id"), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    PUT api/task/assign/:id
// @desc     Assign a task to somebody
// @access   Public
// requires the assignee's id
router.put("/assign/:id", checkObjectId("id"), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if the task has already been assigned
    if (task?.assignee === req.body.id) {
      return res.status(400).json({ msg: "Task already assigned" });
    }
    //assign a person
    task.assignee = req.body.id;

    await task.save();

    return res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/task/unassign/:id
// @desc     Unassign a task from anyone
// @access   Public
// requires the assignee's id
router.put("/unassign/:id", checkObjectId("id"), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if the task has already been assigned
    if (!task) {
      return res.status(400).json({ msg: "Task does not exist" });
    }

    // remove the like
    task.assignee = "";
    task.completed = false;
    await task.save();

    return res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/task/complete/:id
// @desc     Mark task as completed
// @access   Public
router.put("/complete/:id", checkObjectId("id"), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if the task exists
    if (!task) {
      return res.status(400).json({ msg: "Task does not exist" });
    }
    task.completed = true;
    await task.save();

    return res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    Post api/task/complete/:id
// @desc     Mark task as incomplete
// @access   Public
router.put("/incomplete/:id", checkObjectId("id"), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if the task exists
    if (!task) {
      return res.status(400).json({ msg: "Task does not exist" });
    }

    task.completed = false;
    await task.save();

    return res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route    PUT api/task/status/:id
// @desc     change a task status
// @access   Public
router.put("/status/:id", checkObjectId("id"), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if the task exists
    if (!task) {
      return res.status(400).json({ msg: "Task does not exist" });
    }

    task.status = req.body.status;
    task.completedAt = "";
    await task.save();

    return res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    Delete api/task/delete/:id
// @desc     delete a task by id
// @access   Public
router.delete("/delete/:id", checkObjectId("id"), async (req, res) => {
  try {
    await Task.findOneAndRemove({ _id: req.params.id });

    return res.json({ msg: "task deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
