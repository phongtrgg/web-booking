const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room");

router.use("/get", roomController.fetchAll);
router.use("/check", roomController.getRoomCheck);
router.use("/:roomId", roomController.getDetailRoom);

module.exports = router;
