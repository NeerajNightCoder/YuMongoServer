const mongoose=require("mongoose")
const shorid =require("shortid")
const { model } = require("./Doctor")

const OnBoardSchema=mongoose.Schema({
name:String,
speciality:String,
email:String,
phone:String
})

module.exports=mongoose.model("OnBoard",OnBoardSchema)