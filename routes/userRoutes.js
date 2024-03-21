const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { studentSignup } = require("../controllers/userControllers");
router.route("/student/signup").post(studentSignup);

module.exports = router;
