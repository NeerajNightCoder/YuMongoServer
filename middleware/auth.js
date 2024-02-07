const jwt=require('jsonwebtoken')
const User=require('../models/User')

//Protect routes
exports.protect=async (req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token=req.headers.authorization.split(' ')[1]
    }

    console.log(`token ${token}`)
    // else if(req.cookies.token)
    // {
    //     token=req.cookies.token
    // }

    //Make sure toke exists
    if(!token){
        return next(res.status(401).json({success:false,err:"not authorized to access this route"}))
    }
    

    try{
        //Verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(`decoded:${decoded.id}`)
        req.user=await User.findById(decoded.id)
        next()
    }
    catch(err){
        return next(res.status(401).json({success:false,err:"not authorized to access this route"}))
    }
}



// Grant access to specific roles
exports.authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
        {
            return status(403).json({success:true,err:"not authorized"})
        }
        next()
    }
     
}