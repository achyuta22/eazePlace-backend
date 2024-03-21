const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    mobile: {
      type: String,
      require: true,
    },
    designation: {
      type: String,
      require: true,
    },
    credits: { type: Number, default: 0 },
    verified: {
      type: Boolean,
      default: false,
    },
    detailsPdf: {
      type: "String",
    },
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
