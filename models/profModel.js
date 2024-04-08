const mongoose = require("mongoose");

const profSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    mobile: {
      type: String,
      require: true,
    },
    instituteName: { type: String, require: true },
    instituteEmailId: {
      type: String,
      require: true,
    },
    department: {
      type: String,
      require: true,
    },
    position: { type: String, require: true },
    fieldOfExpertise: { type: String, require: true },
    awards: { type: String, require: true },
    credits: { type: Number, default: 0 },
    verified: {
      type: Boolean,
      default: false,
    },
    detailsPdf: {
      type: String,
    },
    linkedIn: { type: String },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

const Prof = mongoose.model("Prof", profSchema);
module.exports = Prof;
