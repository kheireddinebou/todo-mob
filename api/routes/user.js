const User = require("../models/User");
const { verifyTokenAndAuthorisation } = require("./verifyToken");

const router = require("express").Router();

router.get("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(401).json(err);
  }
});

module.exports = router;
