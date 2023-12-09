const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction");
const User = require("../modules/user");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

router.use((req, res, next) => {
  const id = new ObjectId(req.body.id);
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.send({ ok: false, message: "no have user" });
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {});
  //
});

router.use("/add", transactionController.addTransaction);
router.use("/get", transactionController.getTransaction);

module.exports = router;
