const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// require("dotenv").config();

const userRouter = require("./routers/user");
const hotelRouter = require("./routers/hotel");
const roomRouter = require("./routers/room");
const transactionRouter = require("./routers/transaction");
const adminRouter = require("./routers/admin");

const MONGODB_LINK = process.env.MONGO_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/hotel", hotelRouter);
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/transaction", transactionRouter);
app.use("/admin", adminRouter);
app.use((req, res, next) => {
  res.status(400).send({ message: "error fetch not fuond" });
});

mongoose
  .connect(MONGODB_LINK)
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

//acc admin
//admin
//123123
