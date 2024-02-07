const express = require("express")
const {addCouponCodeBooking, getCouponCodeBookingsSingleCode,getAllCouponCodeBookings} = require('../controllers/couponCodesBookings')
const router = express.Router()

router.route('/:couponCode')
      .get(getCouponCodeBookingsSingleCode)  

router.route('/')
    .get(getAllCouponCodeBookings)
    .post(addCouponCodeBooking)


module.exports = router