const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a schema for the user's personal details
const personalDetailsSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  mobile: { type: String },
  designation: { type: String },
  designationProof: { type: String },
  verified: { type: Boolean, default: false },
});

// Define a schema for the user's organization details
const organizationDetailsSchema = new Schema({
  Name: { type: String },
  city: { type: String },
  industry: { type: String },
  description: { type: String },
  logo: { type: String },
  numberOfEmployees: { type: Number },
  stipend: { type: Number },
  Documents: { type: String },
  linkedIn: { type: String },
  instagram: { type: String },
  webPageLink: { type: String },
  verified: { type: Boolean, default: false },
});

// Define the main schema for the user
const professionalSchema = new Schema({
  email: { type: String, required: true },
  credits: { type: Number, default: 0 },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  type: { type: String, default: "professional" },
  personalDetails: personalDetailsSchema,
  organizationDetails: organizationDetailsSchema,
});

// Create a model based on the schema
const professional = mongoose.model("professional", professionalSchema);

module.exports = professional;
