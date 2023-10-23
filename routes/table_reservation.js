var express = require("express");
var router = express.Router();
var TableReservationController = require("../src/controllers/table_reservation.controller");
var authMiddleware = require("../src/middleware/authenticate.middleware");

//auth routes Module
router.post(
  "/add_table_reservation",
  authMiddleware.isAuthenticate,
  TableReservationController.add_table_reservation
);
router.post(
  "/get_table_reservation_list",
  authMiddleware.isAuthenticate,
  TableReservationController.get_table_reservation_list
);
router.post(
  "/update_table_reservation",
  authMiddleware.isAuthenticate,
  TableReservationController.update_table_reservation
);
router.post(
  "/get_all_table_reservation",
  authMiddleware.isAuthenticate,
  TableReservationController.get_all_table_reservation
);

module.exports = router;
