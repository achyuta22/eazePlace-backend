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
    responsibilities: { type: [String] },
    whoCanApply: { type: [String] },
    place: { type: String },
    openings: { type: String },
    startDate: { type: String },
    duration: { type: String },
    stipend: { type: String },
    coverLetterQuestion: { type: String },
    assessmentQuestion: { type: String },
  },
  { timestamps: true }
);

const Intern = mongoose.model("Intern", internSchema);
module.exports = Intern;
