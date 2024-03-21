const bodyParser = require("body-parser");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const saltRounds = 10;
const studentSignup = async (req, res) => {
  console.log("request for signup");
  console.log(req.body);
  const { email, password, username, name, type, mobile, pic } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("email registered");
      res.send({ message: "email already registered", status: 400 });
    } else {
      const hash = bcrypt.hashSync(password, saltRounds);

      const user = await User.create({
        userName: username,
        name: name,
        email: email,
        password: hash,
        pic: pic,
        type: type,
        mobile: mobile,
      });
      console.log(user);
      if (user) {
        res.send({
          message: {
            _id: user._id,
            userName: user.userName,
            name: user.name,
            email: user.email,
            password: user.password,
            verified: user.verified,
            pic: user.pic,
            type: user.type,
            mobile: user.mobile,
            token: await generateToken(user._id),
          },
          status: 201,
        });
      } else {
        res.send({ message: "failed to create user", status: 400 });
      }
    }
  } catch (error) {
    console.log("error occurred", error);
    res.send({ message: "error occurred while signing up", status: 400 });
  }
};

module.exports = { studentSignup };
