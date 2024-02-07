const express=require('express')
const router=express.Router()
const {makePayment,checkPayment}=require('../controllers/payment')
const {protect,authorize}=require('../middleware/auth')


router.route('/makePayment')
       .post(makePayment)

router.route('/checkPayment')
       .post(checkPayment)  

 
module.exports=router      