const express = require("express")
const {login, verifyLogin, getUser, clearCookies, logout, forgetPasswordSendOTP, verifyOTP, changePassword} = require("../controllers/loginControllers")
const router = express.Router()

// router.post("/signup", signup)
router.post("/login",clearCookies, login)
router.delete("/logout",verifyLogin,logout)
router.get("/user", verifyLogin,getUser)
router.post("/forgetPassword",forgetPasswordSendOTP)
router.post("/verifyOtp",verifyOTP)
router.post('/changepassword',changePassword)
module.exports = loginRoutes