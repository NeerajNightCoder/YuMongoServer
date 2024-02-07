const CouponCode = require('../models/CouponCode')
exports.addCouponCode = async(req, res, next) => {
    try {

        const couponCode = await CouponCode.create(req.body) 
        res.status(201).json({
            success: true

        })
    } catch (error) {
        console.log(error)
    }
}


exports.getCouponCodes = async(req, res, next) => {
    try {
        const couponCodes = await CouponCode.find()
        res.status(200).json({ success: true, data:couponCodes })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}