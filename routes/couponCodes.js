const express = require("express")
const {addCouponCode, getCouponCodes} = require('../controllers/couponCodes')
const router = express.Router()

router.route('/')
    .get(getCouponCodes)
    .post(addCouponCode)


module.exports = router