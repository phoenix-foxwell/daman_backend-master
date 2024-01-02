var express = require("express");
var router = express.Router();
var EventsMasterController = require("../src/controllers/eventsmaster.controller");
var authMiddleware = require("../src/middleware/authenticate.middleware");

//auth routes Module
router.post(
  "/get_event_master",
  authMiddleware.isAuthenticate,
  EventsMasterController.get_event_master
);
router.post(
  "/add_event",
  authMiddleware.isAuthenticate,
  EventsMasterController.add_event
);
router.post(
  "/get_user_event",
  authMiddleware.isAuthenticate,
  EventsMasterController.get_user_event
);
router.post(
  "/get_name_event",
  authMiddleware.isAuthenticate,
  EventsMasterController.get_name_event
);

module.exports = router;
