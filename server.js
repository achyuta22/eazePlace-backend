const express = require("express");
const axios = require("axios");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const profRoutes = require("./routes/profRoutes");
const resumeRoutes = require("./routes/resumeRoutes")
const professionalRoutes = require("./routes/professionalRoutes");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const helmet = require("helmet");
const loginRoutes = require("./routes/loginRoutes")
require("./connection/db");
require("dotenv").config();
const app = express();
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(cookieParser())
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(bodyParser());
app.use("/api/students", userRoutes);
app.use("/api/profs", profRoutes);
app.use('/api/resume',resumeRoutes)
app.use("/api/professional", professionalRoutes);
app.use("/api", loginRoutes)
app.listen(process.env.PORT, () => {
  console.log("connected to port", process.env.PORT);
});
