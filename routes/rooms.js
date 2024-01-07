var express = require("express");
var router = express.Router();
var RoomsController = require("../src/controllers/rooms.controller");
var authMiddleware = require("./../src/middleware/authenticate.middleware");

//auth routes Module
router.post(
  "/get_room_list",
  authMiddleware.isAuthenticate,
  RoomsController.get_room_list
);
router.post(
  "/get_all_room_list",
  authMiddleware.isAuthenticate,
  RoomsController.get_all_room_list
);
router.post(
  "/room_reservation",
  authMiddleware.isAuthenticate,
  RoomsController.room_reservation
);
router.post(
  "/manager_room_reservation",
  authMiddleware.isAuthenticate,
  RoomsController.manager_room_reservation
);
router.post(
  "/get_room_reservation",
  authMiddleware.isAuthenticate,
  RoomsController.get_room_reservation
);
router.post(
  "/update_room_status",
  authMiddleware.isAuthenticate,
  RoomsController.update_room_status
);
router.post(
  "/get_room_price_list",
  authMiddleware.isAuthenticate,
  RoomsController.get_room_price_list
);
router.post(
  "/add_room_price_list",
  authMiddleware.isAuthenticate,
  RoomsController.add_room_price_list
);

router.post("/get_room_list_un", RoomsController.get_room_list);
router.post("/room_reservation_un", RoomsController.manager_room_reservation);
router.post(
  "/get_room_reservation_un",
  RoomsController.get_room_reservation
);

module.exports = router;
