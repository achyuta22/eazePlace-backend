const bodyParser = require("body-parser");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const saltRounds = 10;
var nodemailer = require("nodemailer");
const verificationCodes = {};
verificationCodes["rav1"] = 10;
const Response = require("../models/responsesModel");
const Intern = require("../models/internModel");
const project = require("../models/projectModel");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ravihalbharat@gmail.com",
    pass: "zrig xqtk fnjc tkrc",
  },
});
const studentSignup = async (req, res) => {
  console.log("request for signup");
  console.log(req.body);
  const { email, password, name, code } = req.body;
  if (verificationCodes[email] == code) {
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        console.log("email registered");
        res.send({ message: "email already registered", status: 400 });
      } else {
        const hash = bcrypt.hashSync(password, saltRounds);

        const user = await User.create({
          name: name,
          email: email,
          password: hash,
          verified: true,
          type: "student",
        });
        console.log(user);
        if (user) {
          res.send({
            message: {
              _id: user._id,

              name: user.name,
              email: user.email,
              password: user.password,
              verified: user.verified,

              token: await generateToken(user._id),
            },
            status: 201,
          });
        } else {
          res.send({ message: "failed to create user", status: 400 });
        }
      }
    } catch (error) {
      console.log("error occurred", error);
      res.send({ message: "error occurred while signing up", status: 400 });
    }
  } else {
    res.send({ message: "enter correct code", status: 400 });
    console.log("code is incorrect");
  }
};
const studentDetails = async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    institute,
    mobile,
    year,
    branch,
    collegeId,
    pic,
    linkedIn,
    gitHub,
  } = req.body;
  try {
    var user = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        institute,
        mobile,
        year,
        branch,
        collegeId,
        pic,
        linkedIn,
      },
      { new: true }
    );
    console.log("details updated ", user);
    res.send({ message: user, status: 201 });
  } catch (error) {
    console.log(error);
    res.send({ message: "error while updating details", status: 400 });
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
    res.send({ message: "eroro occurred", status: 400 });
  }
};
const emailVerify = async (req, res) => {
  console.log("request for verify");
  console.log(req.body);
  const { email, code } = req.body;
  try {
    if (verificationCodes[email] == code) {
      const user = await User.findOneAndUpdate(
        { email: email },
        { verified: true },
        { new: true }
      );
      if (user) {
        console.log("successfully verified");
        res.send({ message: "verified", status: 201 });
      } else {
        console.log("error while verifying");
        res.send({ message: "error while verifying", status: 400 });
      }
    } else {
      res.send({ message: "enter correct code", status: 400 });
      console.log("code is incorrect");
    }
  } catch (error) {
    console.log("error occureed");
  }
};

const applyToIntern = async (req, res) => {
  console.log("req for applying intern");
  const { internId, userId, coverLetter, assesmentSolution } = req.body;
  try {
    const applied = await Response.findOne({
      applicationId: internId,
      appliedBy: userId,
    });
    console.log(applied);
    if (applied) {
      console.log("already applied");
      res.send({ message: "already applied", status: 400 });
    } else {
      console.log("not applied so u can apply now");
      const apply = Response.create({
        applicationId: internId,
        appliedBy: userId,
        coverLetter,
        assesmentSolution,
      });
      if (apply) {
        console.log("applied succesfuly");
        res.send({ message: "succesfully sent yoyr application", status: 200 });
      } else {
        console.log("error while applying ");
        res.send({ message: "error while applying", status: 400 });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "unexpected error", status: 400 });
  }
};

const searchInterns = async (req, res) => {
  console.log("req for filter");
  const { skills, location, title } = req.query;
  console.log(skills, location, title);
  // const { location, title } = req.body;
  // console.log(req.body);
  try {
    // const interns = await Intern.find({ location, title });
    // const interns = await Intern.find({
    //   $or: [{ place: location }, { title: title }],
    // });
    const interns = await Intern.find({
      $or: [
        { place: { $regex: new RegExp(location, "i") } },
        // { title: { $regex: new RegExp(title, "i") } },
        { skills: { $in: skills } },
        // {
        //   skills: { $elemMatch: { $regex: new RegExp(skills.join("|"), "i") } },
        // },
      ],
    });
    console.log(interns);
    if (interns) {
      res.send({ message: interns, status: 200 });
    }
  } catch (error) {}
};

const internDetails = async (req, res) => {
  console.log("hi");
  try {
    const { id } = req.params;
    console.log(id);
    const intern = await Intern.findById(id);
    console.log(intern);
    if (intern) {
      res.send({ message: intern, status: 200 });
    } else {
      res.send({ message: "no internship found", status: 400 });
    }
  } catch (error) {
    console.error(error);
    res.send({ message: "Internal Server Error", status: 400 });
  }
};

module.exports = {
  studentSignup,
  studentDetails,
  verificationCode,
  emailVerify,
  applyToIntern,
  searchInterns,
  internDetails,
};
