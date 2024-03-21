const express = require("express");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
require("./connection/db");
require("dotenv").config();
const app = express();
app.use(bodyParser());
app.use("/api/users", userRoutes);
app.listen(process.env.PORT, () => {
  console.log("connected to port", process.env.PORT);
});
