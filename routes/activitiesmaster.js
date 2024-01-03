var express = require("express");
var router = express.Router();
var ActivitiesMasterController = require("../src/controllers/activitiesmaster.controller");
var authMiddleware = require("./../src/middleware/authenticate.middleware");

//auth routes Module
router.post(
  "/get_activity_master",
  authMiddleware.isAuthenticate,
  ActivitiesMasterController.get_activity_master
);
router.post(
  "/add_activity",
  authMiddleware.isAuthenticate,
  ActivitiesMasterController.add_activity
);
router.post(
  "/get_user_activity",
  authMiddleware.isAuthenticate,
  ActivitiesMasterController.get_user_activity
);
router.post(
  "/get_all_activity",
  authMiddleware.isAuthenticate,
  ActivitiesMasterController.get_all_activity
);

module.exports = router;
