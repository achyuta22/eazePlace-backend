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
const professional = require("../models/professionalModel");

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

// const personalDetails = async (req, res) => {
//   console.log("request to upload personal details");
//   console.log(req.body.formData);
//   const {
//     id,
//     firstName,
//     lastName,
//     email,
//     mobile,
//     designation,
//     designationProof,
//   } = req.body;
//   try {
//     const personalDetails = await ProfModel.findByIdAndUpdate(id, {
//       personalDetails: {
//         firstName,
//         lastName,
//         email,
//         mobileNumber,
//         designation,
//         designationProof,
//       },
//     });
//     if (personalDetails) {
//       console.log("updated personal details");
//       res.send({ message: "succesfully updated details", status: 200 });
//     } else {
//       console.log("error occurred while uploading details");
//       res.send({
//         message: "error occurred while uploading details",
//         status: 400,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.send({ message: "error occurred", status: 400 });
//   }
// };
// const organizationDetails = async (req, res) => {
//   console.log("request to upload personal details");
//   const {
//     id,
//     organizationName,
//     city,
//     industry,
//     description,
//     logo,
//     numberOfEmployees,
//     stipend,
//     organizationDocuments,
//     linkedIn,
//   } = req.body;
//   try {
//     const organizationDetails = await ProfModel.findByIdAndUpdate(id, {
//       organizationDetails: {
//         organizationName,
//         city,
//         industry,
//         description,
//         logo,
//         numberOfEmployees,
//         stipend,
//         organizationDocuments,
//         linkedIn,
//       },
//     });
//     if (organizationDetails) {
//       console.log("updated organization details");
//       res.send({ message: "succesfully updated details", status: 200 });
//     } else {
//       console.log("error occurred while uploading details");
//       res.send({
//         message: "error occurred while uploading details",
//         status: 400,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.send({ message: "error occurred", status: 400 });
//   }
// };

const uploadDetails = async (req, res) => {
  console.log("req to upload details");
  const { id } = req.params;
  const { formData } = req.body;
  console.log(formData);
  try {
    // const user=professional.findByIdAndUpdate(id,{
    //   personalDetails:{

    //   }
    // })
    const user = await professional.findByIdAndUpdate(
      id,
      {
        $set: {
          "personalDetails.firstName": formData.firstName,
          "personalDetails.lastName": formData.lastName,
          "personalDetails.email": formData.email,
          "personalDetails.mobile": formData.mobile,
          "personalDetails.designation": formData.designation,
          "personalDetails.designationProof": formData.designationProof,
          "organizationDetails.Name": formData.orgName,
          "organizationDetails.city": formData.orgCity,
          "organizationDetails.industry": formData.industry,
          "organizationDetails.description": formData.orgDescription,
          "organizationDetails.logo": formData.orgLogo,
          "organizationDetails.numberOfEmployees": formData.employeesCount,
          "organizationDetails.stipend": formData.minimumStipend,
          "organizationDetails.Documents": formData.orgDocs,
          "organizationDetails.linkedIn": formData.linkedIn,
          "organizationDetails.instagram": formData.instagram,
          "organizationDetails.webPageLink": formData.webpageLink,
        },
      },
      { new: true }
    );
    console.log({ user });
    if (user) {
      res.send({ message: user, status: 200 });
    } else {
      res.send({ message: "unable to update details", status: 400 });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "unexpected error ocurred", status: 400 });
  }
};
// const postIntern = async (req, res) => {
//   console.log("req for posting intern by proffessional");
//   const {
//     id,
//     title,
//     skills,
//     type,
//     description,
//     whoCanApply,
//     responsibilities,
//     place,
//     openings,
//     startDate,
//     duration,
//     stipend,
//     coverLetterQuestion,
//     assesmentQuestion,
//   } = req.body;
//   try {
//     var internPost = await Intern.create({
//       addedBy: id,
//       // addedByModel: "Prof",
//       title,
//       skills,
//       type,
//       description,
//       whoCanApply,
//       responsibilities,
//       place,
//       openings,
//       startDate,
//       duration,
//       stipend,
//       coverLetterQuestion,
//       assesmentQuestion,
//     });
//     // internPost = internPost.populate("addedBy");
//     if (internPost) {
//       res.send({ message: internPost, status: 200 });
//     } else {
//       console.log("error while creating intern post");
//       res.send({ message: "error while creating intern Post", status: 400 });
//     }
//   } catch (error) {
//     console.log(error);
//     res.send({ message: "unecpected eror occurred", status: 400 });
//   }
// };
// const postProject = async (req, res) => {
//   console.log("req for posting project by prof");
//   const {
//     id,
//     title,
//     skills,
//     type,
//     description,
//     whoCanApply,
//     place,
//     openings,
//     startDate,
//     duration,
//     paid,
//     stipend,
//     coverLetterQuestion,
//     assesmentQuestion,
//   } = req.body;
//   try {
//     var projectPost = await project.create({
//       addedBy: id,
//       // addedByModel: "Prof",
//       title,
//       skills,
//       type,
//       description,
//       whoCanApply,
//       place,
//       openings,
//       startDate,
//       duration,
//       stipend,
//       coverLetterQuestion,
//       assesmentQuestion,
//     });
//     // internPost = internPost.populate("addedBy");
//     if (projectPost) {
//       res.send({ message: projectPost, status: 200 });
//     } else {
//       console.log("error while creating project post");
//       res.send({ message: "error while creating project Post", status: 400 });
//     }
//   } catch (error) {
//     console.log(error);
//     res.send({ message: "unecpected eror occurred", status: 400 });
//   }
// };
const postIntern = async (req, res) => {
  const { id } = req.params;
  // const prof = await Prof.findOne(id);
  const prof = await professional.findById(id);

  if (!prof) {
    console.log("register as professional first");
    res.send({ message: "register as a prof", status: 400 });
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
      createdBy: "professional",
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
  const prof = await professional.findById(id);
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
      createdBy: "professional",
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

module.exports = {
  verificationCode,
  professionalSignup,
  // personalDetails,
  // organizationDetails,
  uploadDetails,
  postIntern,
  postProject,
  allInternsPosted,
  allProjectsPosted,
};
