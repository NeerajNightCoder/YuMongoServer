const mongoose = require("mongoose")

const CouponCodeSchema = mongoose.Schema({
    couponCode:String,
    createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model("CouponCode", CouponCodeSchema)