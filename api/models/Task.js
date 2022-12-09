const { default: mongoose } = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    title: { type: String, require: true },
    category: { type: String, require: true },
    checked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
