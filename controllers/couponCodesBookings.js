const CouponCodeBooking = require('../models/CouponCodeBooking')
exports.addCouponCodeBooking = async(req, res, next) => {
    try {

        const couponCodeBooking = await CouponCodeBooking.create(req.body) 
        res.status(201).json({
            success: true

        })
    } catch (error) {
        console.log(error)
    }
}


exports.getAllCouponCodeBookings = async(req, res, next) => {
    try {
        const couponCodeBookings = await CouponCodeBooking.find()
        res.status(200).json({ success: true,count:couponCodeBookings.length, data:couponCodeBookings })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}
exports.getCouponCodeBookingsSingleCode = async(req, res, next) => {
    try {
        const couponCodeBookings = await CouponCodeBooking.find({couponCode:req.params.couponCode})
        res.status(200).json({ success: true,count:couponCodeBookings.length, data:couponCodeBookings })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}