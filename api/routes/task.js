const Task = require("../models/Task");
const { verifyTokenAndAuthorisation } = require("./verifyToken");

const router = require("express").Router();

router.post("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const newTask = await Task.create({ userId: req.params.id, ...req.body });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const newTask = await Task.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json(newTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const allTasks = await Task.find({ userId: req.params.id });
    res.status(201).json(allTasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.body.id);
    res.status(201).json("deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
