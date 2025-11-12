const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ✅ Define task schema
const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: [true, "Task name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Export model
module.exports = mongoose.model("Task", taskSchema);
