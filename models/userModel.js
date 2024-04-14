const mongoose = require("mongoose");
const internshipSchema=mongoose.Schema({
  internId:{
    type:String,
    require:true
  },
  accepted:{
    type:Boolean,
    default:false,
  },
})
const resumeIntershipSchema=mongoose.Schema({
  title: String,
  company: String,
  description: String,
  startDate:Date,
  endDate:Date,
  verified:{
    type:Boolean,
    default:false
  }
})
const resumeProjectSchema = new Schema({
  title: String,
  company: String,
  description: String,
  startDate:Date,
  endDate:Date,
  verified:{
    type:Boolean,
    default:false,
  }

});
const userSchema = mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
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
    resume: [{ type: mongoose.Schema.Types.ObjectId }],
    collegeId: {
      type: String,
      require: true,
    },
    branch: { type: String },
    year: { type: String },
    linkedIn: { type: String },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    resumeInterships:[resumeIntershipSchema],
    resumeProjects:[resumeProjectSchema]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
