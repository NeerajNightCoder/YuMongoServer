const express=require("express")
const {addOnBoard,getOnBoard}=require('../controllers/OnBoard')
const router=express.Router()

router.route('/')
    .get(getOnBoard)
    .post(addOnBoard)

module.exports=router