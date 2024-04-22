const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const internshipSchema = mongoose.Schema({
  internId: {
    type: String,
    require: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});
const resumeIntershipSchema = mongoose.Schema({
  title: String,
  company: String,
  description: String,
  startDate: Date,
  endDate: Date,
  verified: {
    type: Boolean,
    default: false,
  },
});
const resumeProjectSchema = new Schema({
  title: String,
  company: String,
  description: String,
  startDate: Date,
  endDate: Date,
  verified: {
    type: Boolean,
    default: false,
  },
});
const userSchema = mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    title: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    instituteEmail: { type: String, require: true },
    mobile: {
      type: String,
      require: true,
    },
    institute: { type: String, require: true },
    program: { type: String, requyire: true },
    year: { type: String },
    branch: { type: String },
    collegeId: {
      type: String,
    },
    type: {
      type: String,
      default: "Student",
    },
    credits: { type: Number, default: 0 },
    verified: {
      type: Boolean,
      default: false,
    },
    resume: [{ type: mongoose.Schema.Types.ObjectId }],

    linkedIn: { type: String },
    github: { type: String },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    resumeInterships: [resumeIntershipSchema],
    resumeProjects: [resumeProjectSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
