const mongoose = require("mongoose")
const shorid = require("shortid")

const PostSchema = mongoose.Schema({
    content: String,
    detail: String,
    type:String,
    category: String,
    order:Number
})

module.exports = mongoose.model("Post", PostSchema)