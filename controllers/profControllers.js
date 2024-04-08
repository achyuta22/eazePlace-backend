const bodyParser = require("body-parser");
const Prof = require("../models/profModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const saltRounds = 10;
var nodemailer = require("nodemailer");
const Intern = require("../models/internModel");
const project = require("../models/projectModel");
const verificationCodes = {};
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ravihalbharat@gmail.com",
    pass: "zrig xqtk fnjc tkrc",
  },
});

const profSignup = async (req, res) => {
  console.log("request for prof Signup");
  const { email, password, code } = req.body;
  if (verificationCodes[email] == code) {
    try {
      const prof = await Prof.findOne({ email });
      if (prof) {
        console.log("email is already registered");
        res.send({ message: "email already registered", status: 400 });
      } else {
        console.log("email is not registered so can create a acount");
        const hash = bcrypt.hashSync(password, saltRounds);

        const newProf = await Prof.create({
          email: email,
          password: hash,
          verified: true,
          type: "professor",
        });
        if (newProf) {
          res.send({ message: newProf, status: 200 });
        } else {
          res.send({ message: "error while creating new user", status: 400 });
        }
      }
    } catch (error) {
      console.log(error);
      res.send({ message: "unexpected error occurred", status: 400 });
    }
  } else {
    console.log("wrong code entered");
    res.send({ message: "wrong code entered", status: 400 });
  }
};

const verificationCode = async (req, res) => {
  console.log("verification code");
  const { email } = req.body;
  console.log(email);
  try {
    // console.log(user);

    const code = Math.floor(100000 + Math.random() * 900000);

    // Store the verification code
    verificationCodes[email] = code;
    console.log(code);
    var mailOptions = {
      from: "ravihalbharat@gmail.com",
      to: email,
      subject: "Verify your Email",
      text: `Your verification code is: ${code}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.send({ msg: "Verification code sent", status: 266 });
      }
    });
  } catch (error) {
    console.log(error);
    res.send({ message: "error occurred", status: 400 });
  }
};
const uploadDetails = async (req, res) => {
  const {
    id,
    type,
    firstName,
    lastName,
    institueName,
    InstituteEmailId,
    department,
    position,
    fieldOfExpertise,
    awards,
  } = req.body;
  try {
    const profDetails = Prof.findByIdAndUpdate(id, {
      type,
      firstName,
      lastName,
      institueName,
      InstituteEmailId,
      department,
      position,
      fieldOfExpertise,
      awards,
    });
    if (profDetails) {
      console.log("updated prof details");
      res.send({ message: "succesfully updated details", status: 200 });
    } else {
      console.log("error occurred while uploading details");
      res.send({
        message: "error occurred while uploading details",
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "error occurred", status: 400 });
  }
};

const postIntern = async (req, res) => {
  console.log("req for posting intern by prof");
  const {
    id,
    title,
    skills,
    type,
    description,
    whoCanApply,
    responsibilities,
    place,
    openings,
    startDate,
    duration,
    stipend,
    coverLetterQuestion,
    assesmentQuestion,
  } = req.body;
  try {
    var internPost = await Intern.create({
      addedBy: id,
      // addedByModel: "Prof",
      title,
      skills,
      type,
      description,
      whoCanApply,
      responsibilities,
      place,
      openings,
      startDate,
      duration,
      stipend,
      coverLetterQuestion,
      assesmentQuestion,
    });
    // internPost = internPost.populate("addedBy");
    if (internPost) {
      res.send({ message: internPost, status: 200 });
    } else {
      console.log("error while creating intern post");
      res.send({ message: "error while creating intern Post", status: 400 });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "unecpected eror occurred", status: 400 });
  }
};
const postProject = async (req, res) => {
  console.log("req for posting project by prof");
  const {
    id,
    title,
    skills,
    type,
    description,
    responsibilities,
    whoCanApply,
    place,
    openings,
    startDate,
    duration,
    paid,
    stipend,
    coverLetterQuestion,
    assesmentQuestion,
  } = req.body;
  try {
    var projectPost = await project.create({
      addedBy: id,
      // addedByModel: "Prof",
      title,
      skills,
      type,
      description,
      whoCanApply,
      responsibilities,
      place,
      openings,
      startDate,
      duration,
      stipend,
      coverLetterQuestion,
      assesmentQuestion,
    });
    // internPost = internPost.populate("addedBy");
    if (projectPost) {
      res.send({ message: projectPost, status: 200 });
    } else {
      console.log("error while creating project post");
      res.send({ message: "error while creating project Post", status: 400 });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "unecpected eror occurred", status: 400 });
  }
};
const allInternsPosted = async (req, res) => {
  console.log("req for all internships posted by professor");
  const { Id } = req.body;
  try {
    const internsPosted = await Intern.find({ addedBy: Id });
    res.send({ message: internsPosted, status: 200 });
  } catch (error) {
    console.log(error);
    res.send({ message: "Error occurred", status: 400 });
  }
};

module.exports = {
  verificationCode,
  profSignup,
  uploadDetails,
  postIntern,
  postProject,
  allInternsPosted,
};
