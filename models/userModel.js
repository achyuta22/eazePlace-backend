const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
