var express = require("express");
var router = express.Router();
var MailController = require("./../src/controllers/mail.controller");

//auth routes Module
router.post("/contact", MailController.contact);
router.post("/enquiry", MailController.enquiry);
router.post("/complaint", MailController.complaint);
router.post("/getcec", MailController.getcec);
router.post("/updatecec", MailController.updatecec);

module.exports = router;
