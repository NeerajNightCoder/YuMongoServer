const UserDetail=require('../models/UserDetail')

exports.addUserDetail=async(req,res,next)=>{
    try {
        console.log('add user details')
        const userDetail=await UserDetail.create(req.body)
        console.log(userDetail)
        res.status(201).json({payload:userDetail})
    } catch (error) {
        console.log(error)
        res.status(400).json({msg:"failed"})
    }
    
}


exports.getUserDetail=async(req,res,next)=>{
    try {
        const userDetail=await UserDetail.findById(req.params.id)
        if(!userDetail) return res.status(404).json({msg:'No such user detail'})
        res.status(200).json({payload:userDetail})
    } catch (error) {
        res.status(400).json({msg:"failed"})
    }
}