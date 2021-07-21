const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  taskId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
  status: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  assignee: {
    type: String,
  },
  assigner: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Task = mongoose.model("task", TaskSchema);
