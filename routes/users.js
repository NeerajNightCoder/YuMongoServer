const express=require('express')
const {getUsers,getUser, addUser,updateUser,deleteUser}=require('../controllers/user')
const router=express.Router()

const {protect,authorize}=require('../middleware/auth')

router.route('/:id')
    // .get(protect,authorize('user','manager','admin'), getUser)
    .get( getUser)
    .put(protect,authorize('user','manager','admin'),updateUser)
    .delete(protect,authorize('user','manager','admin'), deleteUser)

router.route('/')
    .get(protect,authorize('manager','admin'), getUsers)
   

module.exports=router