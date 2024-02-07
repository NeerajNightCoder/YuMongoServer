const express=require("express")
const {addHospital,getHospitals,getHospital}=require('../controllers/hospitals')
const router=express.Router()
const {protect,authorize }=require('../middleware/auth')

router.route('/:id')
    .get(getHospital)

router.route('/')
    .get(getHospitals)
    .post(protect,authorize('admin'),addHospital)

module.exports=router