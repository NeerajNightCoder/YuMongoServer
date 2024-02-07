const express=require('express')
const router=express.Router()
const {addUserDetail,getUserDetail}=require('../controllers/userDetail')

router.route('/:id')
      .get(getUserDetail)

router.route('/')
      .post(addUserDetail)

module.exports=router
