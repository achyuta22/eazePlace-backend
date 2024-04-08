const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  verificationCode,
  professionalSignup,
  personalDetails,
  organizationDetails,
  postIntern,
  postProject,
} = require("../controllers/professionalControllers");

router.route("/signUp").post(professionalSignup);
router.route("/verificationCode").post(verificationCode);
router.route("/personalDetails").post(personalDetails);
router.route("/organizationDetails").post(organizationDetails);
router.route("/postInternship").post(postIntern);
router.route("/postProject").post(postProject);

module.exports = router;
