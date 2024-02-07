const mongoose = require("mongoose");
const UserDetailSchema=mongoose.Schema({
name:String,
phone:String,
age:String,
bloodGroup:String,
address:String,
})

module.exports=mongoose.model('UserDetail',UserDetailSchema)