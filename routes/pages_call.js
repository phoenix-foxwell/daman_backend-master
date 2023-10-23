var express = require("express");
var router = express.Router();
router.get("/", async (req, res) => {
  res.render("index");
});
router.get("/membership", async (req, res) => {
  res.render("data_management/membership");
});
router.get("/menu", async (req, res) => {
  res.render("menu/index");
});

router.get("/register", async (req, res) => {
  res.render("data_management/register");
});

router.get("/gamezone", async (req, res) => {
  res.render("data_management/gamezone");
});

router.get("/restaurant", async (req, res) => {
  res.render("data_management/restaurant");
});

router.get("/rooms", async (req, res) => {
  res.render("data_management/rooms");
});
router.get("/aboutus", async (req, res) => {
  res.render("data_management/aboutus");
});
router.get("/tenders", async (req, res) => {
  res.render("data_management/tenders");
});

router.get("/spa", async (req, res) => {
  res.render("data_management/spa");
});
module.exports = router;
