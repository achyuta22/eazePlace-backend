const bodyParser = require("body-parser");
const Prof = require("../models/profModel");
const bcrypt = require("bcrypt");
const Response = require("../models/responsesModel");
const generateToken = require("../config/generateToken");
const saltRounds = 10;
var nodemailer = require("nodemailer");
const Intern = require("../models/internModel");
const project = require("../models/projectModel");
const professional = require("../models/professionalModel");
const ProfModel = require("../models/professionalModel");
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
          verified: false,
          type: "professor",
        });
        if (newProf) {
          res.send({
            message: {
              _id: newProf._id,
              email: newProf.email,
              password: newProf.password,
              verified: newProf.verified,
              credits: newProf.credits,
              token: await generateToken(newProf._id),
            },
            status: 200,
          });
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
    title,
    firstName,
    lastName,
    instituteName,
    instituteEmailId,
    department,
    position,
    fieldOfExpertise,
    mobile,
    pic,
    proofId,
    linkedIn,
    page,
  } = req.body;
  try {
    const profDetails = await Prof.findByIdAndUpdate(id, {
      title,
      firstName,
      lastName,
      instituteName,
      instituteEmailId,
      department,
      position,
      fieldOfExpertise,
      mobile,
      pic,
      proofId,
      linkedIn,
      page,
    });
    if (profDetails) {
      console.log("updated prof details");
      res.send({ message: profDetails, status: 200 });
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
  const { id } = req.params;
  // const prof = await Prof.findOne(id);
  const prof = await Prof.findById(id);
  const professional = await ProfModel.findById(id);

  if (!prof && !professional) {
    console.log("register as prof or professional first");
    res.send({ message: "register as a prof or professional", status: 400 });
    return;
  }
  console.log("req for posting intern by prof");
  const {
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
      createdBy: "prof",
    });
    // internPost = internPost.populate("addedBy");
    console.log(internPost);
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
  const { id } = req.params;
  const prof = await Prof.findById(id);
  if (!prof) {
    console.log("register as prof first");
    res.send({ message: "register as a prof", status: 400 });
    return;
  }
  console.log("req for posting project by prof");
  const {
    title,
    skills,
    type,
    workType,
    description,
    responsibilities,
    perks,
    whoCanApply,
    place,
    openings,
    startDate,
    duration,
    paid,
    stipend,
    ppo,
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
      workType,
      description,
      whoCanApply,
      responsibilities,
      place,
      openings,
      perks,
      startDate,
      duration,
      paid,
      stipend,
      ppo,
      coverLetterQuestion,
      assesmentQuestion,
      createdBy: "prof",
    });
    // internPost = internPost.populate("addedBy");
    console.log(projectPost);
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
  const { Id } = req.params;
  try {
    const internsPosted = await Intern.find({ addedBy: Id });
    console.log(internsPosted);
    res.send({ message: internsPosted, status: 200 });
  } catch (error) {
    console.log(error);
    res.send({ message: "Error occurred", status: 400 });
  }
};
const allProjectsPosted = async (req, res) => {
  console.log("req for all projects posted by professor");
  const { Id } = req.params;
  try {
    const projectsPosted = await project.find({ addedBy: Id });
    res.send({ message: projectsPosted, status: 200 });
  } catch (error) {
    console.log(error);
    res.send({ message: "Error occurred", status: 400 });
  }
};
const responses = async (req, res) => {
  const { Id } = req.params;
  try {
    const responses = await Response.find({ applicationId: Id }).populate(
      "appliedBy"
    );
    console.log(responses);
    res.send({ message: responses, status: 200 });
  } catch (error) {}
};

const shortList = async (req, res) => {
  const { Id } = req.params;
  console.log(Id);
  const status = await Response.findByIdAndUpdate(
    Id,
    {
      status: "shortlisted",
    },
    { new: true }
  );
  console.log(status);
  if (status) {
    res.send({ message: "succesfully shortlisted", status: 200 });
  } else {
    res.send({ message: "Error while shortlisting", status: 400 });
  }
};

module.exports = {
  verificationCode,
  profSignup,
  uploadDetails,
  postIntern,
  postProject,
  allInternsPosted,
  allProjectsPosted,
  responses,
  shortList,
};
