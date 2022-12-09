const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    // check if the user is exists
    const findUser = await User.findOne({ email: req.body.email });

    if (findUser) {
      res.status(401).json({ type: "email", message: "this email is exists" });
      return;
    }
    try {
      const newUser = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: CryptoJS.RC4.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString(),
      });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.post("/login", async (req, res) => {
  try {
    // check if the user is exists
    const findUser = await User.findOne({ email: req.body.email });

    if (!findUser) {
      res
        .status(401)
        .json({ type: "email", message: "this email is not exists" });
      return;
    }

    // check if password is correct

    const originalPassword = CryptoJS.RC4.decrypt(
      findUser.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res
        .status(401)
        .json({ type: "password", message: "incorrect password!" });
      return;
    }

    const { passowrd, ...others } = findUser._doc;

    const accessToken = jwt.sign(
      {
        id: findUser._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
