const express = require("express");
const app = express();
require("dotenv").config();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const mongoose = require("mongoose");

const port = process.env.PORT;

app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB_CONNECTED"))
  .catch(err => console.log(err));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.listen(port, () =>
  console.log(`app is renning on http://localhost:${port}`)
);
