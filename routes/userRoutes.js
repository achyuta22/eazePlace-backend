const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  studentSignup,
  studentDetails,
  verificationCode,
  emailVerify,
  applyTo,
  searchInterns,
  internDetails,
  projectsApplied,
  appliedTo,
} = require("../controllers/userControllers");
router.route("/signup").post(studentSignup);
router.route("/verificationCode").post(verificationCode);
router.route("/emailVerify").post(emailVerify);
router.route("/uploadDetails").post(studentDetails);
router.route("/applyTo").post(applyTo);
router.route("/filter").get(searchInterns);
router.route("/intern/:id").get(internDetails);
// router.route("projects").get(projectsApplied);
router.route("/appliedTo").get(appliedTo);

module.exports = router;
