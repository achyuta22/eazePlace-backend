const express = require("express");
const axios = require("axios");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const profRoutes = require("./routes/profRoutes");
const professionalRoutes = require("./routes/professionalRoutes");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("./connection/db");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(bodyParser());
app.use("/api/students", userRoutes);
app.use("/api/profs", profRoutes);
app.use("/api/professional", professionalRoutes);
app.listen(process.env.PORT, () => {
  console.log("connected to port", process.env.PORT);
});
