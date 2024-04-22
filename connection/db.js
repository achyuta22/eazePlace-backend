const mongoose = require("mongoose");
require("dotenv").config();
const connection = async () => {
  try {
    await mongoose
      .connect(process.env.mongodbUrl)
      .then(() => {
        console.log("connected to database");
      })
      .catch((err) => {
        console.log("error occurred");
        console.log(err);
      });
  } catch (error) {
    console.log("error occurred");
    console.log(error);
  }
};

connection();
