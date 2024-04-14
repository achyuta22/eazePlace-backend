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
    skills: { type: [String] },
    type: { type: String },
    workType: { type: String },
    description: { type: String },
    responsibilities: { type: [String] },
    perks: { type: [String] },
    whoCanApply: { type: [String] },
    place: { type: String },
    openings: { type: Number },
    startDate: { type: String },
    duration: { type: String },
    paid: { type: Boolean, default: false },
    stipend: { type: String },
    ppo: { type: Boolean, default: false },
    coverLetterQuestion: { type: String },
    assessmentQuestion: { type: String },
    status: { type: String, default: "active" },
    createdBy: { type: String, require: true },
  },
  { timestamps: true }
);

const project = mongoose.model("Project", projectSchema);
module.exports = project;
