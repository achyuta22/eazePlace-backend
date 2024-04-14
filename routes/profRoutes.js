const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const {
  verificationCode,
  profSignup,
  uploadDetails,
  postIntern,
  postProject,
  allInternsPosted,
  allProjectsPosted,
  responses,
  shortList,
} = require("../controllers/profControllers");

router.route("/signUp").post(profSignup);
router.route("/verificationCode").post(verificationCode);
router.route("/uploadDetails").post(uploadDetails);
router.route("/postIntern/:id").post(postIntern);
router.route("/postProject/:id").post(postProject);
router.route("/allInterns/:Id").get(allInternsPosted);
router.route("/allProjects/:Id").get(allProjectsPosted);
router.route("/responses/:Id").get(responses);
router.route("/shortList/:Id").post(shortList);

module.exports = router;
