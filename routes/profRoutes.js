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
} = require("../controllers/profControllers");

router.route("/signUp").post(profSignup);
router.route("/verificationCode").post(verificationCode);
router.route("/uploadDetails").post(uploadDetails);
router.route("/postIntern").post(postIntern);
router.route("/postProject").post(postProject);
router.route("/allInterns").get(allInternsPosted);

module.exports = router;
