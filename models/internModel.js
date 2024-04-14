const mongoose = require("mongoose");

const internSchema = mongoose.Schema(
  {
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prof",
    },
    // addedByModel: {
    //   type: String,
    //   required: true,
    //   enum: ["Prof", "Organisation"],
    // },
    title: { type: String },
    skills: { type: [String] },
    type: { type: String },
    description: { type: String },
    workType: { type: String },
    responsibilities: { type: [String] },
    perks: { type: [String] },
    whoCanApply: { type: [String] },
    place: { type: String },
    openings: { type: Number },
    startDate: { type: String },
    duration: { type: String },
    stipend: { type: String },
    ppo: { type: Boolean, default: false },
    coverLetterQuestion: { type: String },
    assessmentQuestion: { type: [String] },
    status: { type: String, default: "active" },
    createdBy: { type: String, require: true },
  },
  { timestamps: true }
);

const Intern = mongoose.model("Intern", internSchema);
module.exports = Intern;
