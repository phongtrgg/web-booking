const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.use("/get-board", adminController.getBoard);
router.use("/get-revenue", adminController.getRevenue);
router.use("/edit-trans", adminController.editTransSTT);

router.use("/get-hotel", adminController.getHotel);
router.use("/delete-hotel", adminController.deleteHotel);
router.use("/add-hotel", adminController.postNewHotel);
router.use("/edit-hotel/:hotelId", adminController.postEditHotel);

router.use("/get-room", adminController.getRooms);
router.use("/delete-room", adminController.deleteRoom);
router.use("/add-room", adminController.postNewRoom);
router.use("/edit-room/:roomId", adminController.postEditRoom);

router.use("/get-user", adminController.getUser);
router.use("/delete-user", adminController.deleteUser);

module.exports = router;
