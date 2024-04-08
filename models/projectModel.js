const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
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
    skills: { type: String },
    type: { type: String },
    description: { type: String },
    whoCanApply: { type: String },
    place: { type: String },
    openings: { type: String },
    startDate: { type: String },
    duration: { type: String },
    paid: { type: Boolean, default: false },
    stipend: { type: String },
    coverLetterQuestion: { type: String },
    assessmentQuestion: { type: String },
  },
  { timestamps: true }
);

const project = mongoose.model("Project", projectSchema);
module.exports = project;
