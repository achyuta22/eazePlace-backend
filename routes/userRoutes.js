const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  studentSignup,
  studentDetails,
  verificationCode,
  emailVerify,
  applyToIntern,
  searchInterns,
  internDetails,
} = require("../controllers/userControllers");
router.route("/signup").post(studentSignup);
router.route("/verificationCode").post(verificationCode);
router.route("/emailVerify").post(emailVerify);
router.route("/uploadDetails").post(studentDetails);
router.route("/applyToIntern").post(applyToIntern);
router.route("/filter").get(searchInterns);
router.route("/intern/:id").get(internDetails);

module.exports = router;
