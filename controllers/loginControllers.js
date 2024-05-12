const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "123"
const saltRounds = 10;
require("dotenv").config();
const nodemailer = require('nodemailer')
const userOTP = require("../models/userOTP.js");
const crypto =require('crypto');
const Prof = require("../models/profModel.js");
const professional = require("../models/professionalModel.js");

// const signup = async (req, res, next) => {
//   const { name, email, password } = req.body;
//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email: email });
//   } catch (err) {
//     console.log(err);
//   }
//   const hashedPassword = bcrypt.hashSync(password);
//   if (!existingUser) {
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     try {
//       await user.save();
//     } catch (err) {
//       console.log(err);
//     }

//     return res.status(201).json({ message: user });
//   } else {
//     res.status(500).json({ message: "user already existed" });
//   }
// 
// };
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser = await User.findOne({ email: email });
  if(!existingUser)
  {
    existingUser = await Prof.findOne({email:email})
  }
  if(!existingUser)
  {
    existingUser = await professional.findOne({email:email})
  }
  if (!existingUser) {
    res.status(404).json({ message: "User not found" });
  } else {
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "wrong password" });
    }
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });
 res.cookie(existingUser._id, token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60*60),
      httpOnly: true,
      sameSite: "lax"
    });

    return res
      .status(200)
      .json({ message: "Login sucessfully", user: existingUser});
  }
};
const verifyLogin = async (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log((cookies))
  const token = String(cookies).split("=")[1];
  if (!token) {
    return res.send({ message: "Token not found",status:404});
  }
  console.log(token)
  jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Invalid token" });
    }
    req.id = user.id;
    next();
  });
};
const getUser = async (req, res, next) => {
  const userID = req.id;
  let user;
  try {
    user = await User.findById(userID, "-password");
    if(!user)
    {
      user = await Prof.findById(userID, "-password");
    }
    if(!user)
    {
      user = await professional.findById(userID, "-password");
    }
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
};
const clearCookies=async(req,res,next)=>{
  const cookies = req.headers.cookie;
  const token = String(cookies).split("=")[1];
  if (!token) {
    next();
    return
  }
  jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Invalid token" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`]='';
    next();
  });
}
const logout=async(req,res,next)=>{
  const cookies = req.headers.cookie;
  const token = String(cookies).split("=")[1];
  if (!token) {
    return res.status(200).json({ message: "Token not found" });
  }
  jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Invalid token" });
    }
    try
    {res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`]='';}
    catch(err){
      return res.status(500).json({message:err})
    }
    return res.status(200).json({message:"Sucessfully logged out"})
  });
}
const forgetPasswordSendOTP = async(req,res,next)=>{
  const currentUser =await User.findOne({email:req.body.email})
  if(!currentUser){
    return res.status(500).json({message:"user not found, please signup"})
  }
  const ifOtpExist = await userOTP.findOne({userId:currentUser._id})
  if(ifOtpExist){
    await userOTP.deleteMany({userId:currentUser._id})
  }
  const transporter = await nodemailer.createTransport({
    service:"gmail",
    port:587,
    secure:false,
    auth:{
      user:process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })
  const otp = Math.floor(Math.random()*9000+1000)
  console.log(otp)
  const hashedopt =  bcrypt.hashSync(otp.toString())
  const newUserOTP =await new userOTP({
    userId:currentUser._id,
    otp:hashedopt,
    created:Date.now(),
    expires:Date.now()+60*60*1000
  })
  await newUserOTP.save()
  const message = {
    from:"Eazeplace",
    to:currentUser.email,
    subject:"opt",
    html:`<p>Your OTP is ${otp}`
  }
  const link = `/verifyotp?${currentUser._id}`
  transporter.sendMail(message).then(()=>{
    return res.status(200).json({message:"OTP sent",link})
  }).catch(err=> {
    return res.status(500).json({message:err})
  })
  
}
const verifyOTP = async(req,res,next)=>{
  const otp = req.body.otp;
  const id = req.body.id;
  console.log(id,otp)
  const currentUser = await User.findOne({_id:id})
  // const email = currentUser.email;
  const currentUserOtp =await userOTP.findOne({userId:id})
  const isOtpCorrect = bcrypt.compareSync(
    otp,currentUserOtp.otp
  )
  if(!isOtpCorrect){
    return res.status(500).json({message:"Wrong OTP"})
  }
  if(Date.now()> currentUserOtp.expires)
  {
    return res.status(500).json({message:"OTP expired"})
  }
  await userOTP.deleteMany({userId:currentUser._id})
  const token = crypto.randomBytes(64).toString('hex')
  res.cookie(currentUser._id, token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60*5),
    httpOnly: true,
    sameSite: "lax"
  });
  const hashedToken = bcrypt.hashSync(token)
  const url = `/changepassword?token=${hashedToken}`
  return res.status(200).json({message:"OTP verified sucessfully",url})
}
const changePassword=async(req,res,next)=>{
  const urlToken = req.body.token;
  const cookies = req.headers.cookie;
  const token = String(cookies).split("=")[1];
  const isTokenValid = bcrypt.compareSync(token,urlToken)
  if(!isTokenValid){
    return res.status(500).json({message:"Link not valid"})
  }
  const newPassword = req.body.newPassword;
  const hashedPassword = bcrypt.hashSync(newPassword)
  const userId = String(cookies).split("=")[0];
  // const existingUser =await User.findOne({_id:userId})
  await User.findOneAndUpdate({_id:userId},{password:hashedPassword})
  res.clearCookie(`${userId}`);
  req.cookies[`${userId}`]='';
  return res.status(200).json({message:`password changed to ${hashedPassword}`})
}


// exports.signup = signup;
exports.login = login;
exports.verifyLogin = verifyLogin;
exports.getUser = getUser;
exports.clearCookies = clearCookies
exports.logout = logout
exports.forgetPasswordSendOTP = forgetPasswordSendOTP
exports.verifyOTP = verifyOTP
exports.changePassword = changePassword