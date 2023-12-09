const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotel");

router.use("/get", hotelController.fetchAll);
router.use("/search", hotelController.hotelSearch);
router.use("/:hotelId", hotelController.getDetail);

module.exports = router;
