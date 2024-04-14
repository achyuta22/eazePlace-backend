const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const responseModel = mongoose.Schema(
  {
    applicationId: { type: Schema.Types.ObjectId },
    appliedBy: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String },
    status: { type: String, default: "applied" },
    coverLetter: { type: String },
    assesmentSolution: { type: String },
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseModel);

module.exports = Response;
