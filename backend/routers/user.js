const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.use("/sigup", userController.addUser);
router.use("/login", userController.loginUser);
router.use("/getDetail", userController.getDetail);
router.use("/edit", userController.editUser);

module.exports = router;
