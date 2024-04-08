const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a schema for the user's personal details
const personalDetailsSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  mobileNumber: { type: String },
  designation: { type: String },
  designationProof: { type: String },
});

// Define a schema for the user's organization details
const organizationDetailsSchema = new Schema({
  organizationName: { type: String },
  city: { type: String },
  industry: { type: String },
  description: { type: String },
  logo: { type: String },
  numberOfEmployees: { type: Number },
  stipend: { type: Number },
  organizationDocuments: { type: String },
  linkedIn: { type: String },
});

// Define the main schema for the user
const professionalSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  personalDetails: personalDetailsSchema,
  organizationDetails: organizationDetailsSchema,
});

// Create a model based on the schema
const professional = mongoose.model("professional", professionalSchema);

module.exports = professional;
