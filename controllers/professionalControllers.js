const bodyParser = require("body-parser");
const Prof = require("../models/profModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const saltRounds = 10;
var nodemailer = require("nodemailer");
const Intern = require("../models/internModel");
const project = require("../models/projectModel");
// const professional = require("../models/professionalModel");
const verificationCodes = {};
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ravihalbharat@gmail.com",
    pass: "zrig xqtk fnjc tkrc",
  },
});

const verificationCode = async (req, res) => {
  console.log("request for verification code");
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
// const professionalSignup = async (req, res) => {
//   console.log("request for prof Signup");
//   const { email, password, code } = req.body;
//   if (verificationCodes[email] == code) {
//     try {
//       const professional = await professional.findOne({ email });
//       if (professional) {
//         console.log("email is already registered");
//         res.send({ message: "email already registered", status: 400 });
//       } else {
//         console.log("email is not registered so can create a acount");
//         const hash = bcrypt.hashSync(password, saltRounds);

//         const newProfessional = await professional.create({
//           email: email,
//           password: hash,
//           verified: true,
//           type: "professional",
//         });
//         if (newProf) {
//           res.send({ message: newProfessional, status: 200 });
//         } else {
//           res.send({ message: "error while creating new user", status: 400 });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       res.send({ message: "unexpected error occurred", status: 400 });
//     }
//   } else {
//     console.log("wrong code entered");
//     res.send({ message: "wrong code entered", status: 400 });
//   }
// };
const ProfModel = require("../models/professionalModel");

const professionalSignup = async (req, res) => {
  console.log("request for prof Signup");
  const { email, password, code } = req.body;
  if (verificationCodes[email] == code) {
    try {
      const professional = await ProfModel.findOne({ email });
      if (professional) {
        console.log("email is already registered");
        res.send({ message: "email already registered", status: 400 });
      } else {
        console.log("email is not registered so can create a acount");
        const hash = bcrypt.hashSync(password, saltRounds);

        const newProfessional = await ProfModel.create({
          email: email,
          password: hash,

          type: "professional",
        });
        if (newProfessional) {
          res.send({ message: newProfessional, status: 200 });
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

const personalDetails = async (req, res) => {
  console.log("request to upload personal details");
  const {
    id,
    firstName,
    lastName,
    email,
    mobileNumber,
    designation,
    designationProof,
  } = req.body;
  try {
    const personalDetails = await ProfModel.findByIdAndUpdate(id, {
      personalDetails: {
        firstName,
        lastName,
        email,
        mobileNumber,
        designation,
        designationProof,
      },
    });
    if (personalDetails) {
      console.log("updated personal details");
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
const organizationDetails = async (req, res) => {
  console.log("request to upload personal details");
  const {
    id,
    organizationName,
    city,
    industry,
    description,
    logo,
    numberOfEmployees,
    stipend,
    organizationDocuments,
    linkedIn,
  } = req.body;
  try {
    const organizationDetails = await ProfModel.findByIdAndUpdate(id, {
      organizationDetails: {
        organizationName,
        city,
        industry,
        description,
        logo,
        numberOfEmployees,
        stipend,
        organizationDocuments,
        linkedIn,
      },
    });
    if (organizationDetails) {
      console.log("updated organization details");
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
  console.log("req for posting intern by proffessional");
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

module.exports = {
  verificationCode,
  professionalSignup,
  personalDetails,
  organizationDetails,
  postIntern,
  postProject,
};
