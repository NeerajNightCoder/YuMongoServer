const mongoose = require("mongoose")
const shorid = require("shortid")

const MessageSchema = mongoose.Schema({
    fullname: String,
    msg: String,
    email: String,
    phone: String,
    createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model("Message", MessageSchema)