const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const responseModel = mongoose.Schema({
  applicationId: { type: Schema.Types.ObjectId },
  appliedBy: { type: Schema.Types.ObjectId },
  status: { type: String },
  coverLetter: { type: String },
  assesmentSolution: { type: String },
});

const Response = mongoose.model("Response", responseModel);
module.exports = Response;
