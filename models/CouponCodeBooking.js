const mongoose = require("mongoose")

const CouponCodeBookingSchema = mongoose.Schema({
    couponCode:String,
    phone:String,
    createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model("CouponCodeBooking", CouponCodeBookingSchema)