const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userOTPSchema = new Schema({
    userId:String,
    otp:String,
    created:Date,
    expires:Date
})
module.exports = mongoose.model('userOTP',userOTPSchema)