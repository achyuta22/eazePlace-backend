const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  verificationCode,
  professionalSignup,
  // personalDetails,
  // organizationDetails,
  postIntern,
  postProject,
  uploadDetails,
  allInternsPosted,
  allProjectsPosted,
} = require("../controllers/professionalControllers");

router.route("/signUp").post(professionalSignup);
router.route("/verificationCode").post(verificationCode);
// router.route("/uploadDetails").post(uploadDetails);
// router.route("/organizationDetails").post(organizationDetails);
router.route("/uploadDetails/:id").post(uploadDetails);
router.route("/postIntern/:id").post(postIntern);
router.route("/postProject/:id").post(postProject);
router.route("/allInternsPosted/:Id").get(allInternsPosted);
router.route("/allProjectsPosted/:Id").get(allProjectsPosted);

module.exports = router;
