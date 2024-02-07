const User=require('../models/User')
const referralCodes=require('referral-codes')

//@desc      Register  user
//@route     POST /api/v1/auth/register
//access     Public
exports.registerUser=async(req,res,next)=>{
   
    console.log(req.body)
    
    let user
    try {
        const {name,email,phone,code,password,role}=req.body
         //Create user
         if(!role) role="user"
        if(role==='user'|| (role==='manager'&& code==="abcde"))
        {
            const newUserRefCode=referralCodes.generate({length:6,count:1})[0]
             user=await User.create({
                name,
                email,
                phone,
                password,
                role,
                referral:{code:newUserRefCode}
            })

           
            //if the registration data contains a refferal code then find that user whose referral code has been used and increase the count of the code
            if(req.body.referralCode){
                
                const referralUser=await User.findOneAndUpdate({'referral.code':req.body.referralCode},{$inc:{'referral.count':1}},{new:true})
               if(referralUser)
               {
                   console.log("referral code is correct")
                     const newUser=await User.findOneAndUpdate({"referral.code":newUserRefCode},{$inc:{"referral.count":1}},{new:true})
               }
            }

            //Create token
            const token=user.getSignedJwtToken()

            res.status(201).json({success:true,userId:user._id,token}) 
        }
        
        else{
            res.status(400).json({success:false,msg:"something wrong"})
        }
        

   
    } catch (error) {
        console.log(error)
        if (error.name === 'MongoError' && error.code === 11000) {
           return res.status(400).json({success:false,err:"Phone number already registered"})
          }
        res.status(400).json({success:false})
    }
}
 


//@desc      Login  user
//@route     POST /api/v1/auth/login
//access     Public
exports.loginUser=async(req,res,next)=>{
       console.log(JSON.stringify(req.body))
    
    try {

        
      
        let {email,password,role}=req.body
        
        if(!role) role="user"
        console.log("1")
         //Create user
        if((role==='user' && !email)||(role==='manager'&&(!email||!password)))
        {   
            console.log(`role${role} email${email}`)
            return status(400).json({success:false})
        }
        console.log("2")
        //Check for user
        const user= await User.findOne({email}).select('+password')
        console.log(user)
        if(!user){return status(401).json({success:false,err:"Invalid credentials"})}
        console.log('5')
      
        //Check if password matches
        const isMatch=await user.matchPassword(password)
        console.log("Password Matched")
        
        if(role==="manager" && !isMatch)
        return status(401).json({success:false,err:"Invalid credentials"}) 

        


        // if(req.body.role==='user'|| (req.body.role==='manager'&& code==="abcde"))
        // {
            
             

            //Create token
            const token=user.getSignedJwtToken()
            console.log(`userId${user._id} user${user.name}`)
            res.status(201).json({success:true,userId:user._id,token,name:user.name}) 
        // }
        
        // else{
        //     res.status(400).json({success:false})
        // }
        

   
    } catch (error) {
        res.status(400).json({success:false,err:error})
    }
}

//@desc Get current logged in user
//@route POST /api/v1/auth/me
//@access Private
exports.getMe=async (req,res,next)=>{
    const user=await User.findById(req.user.id)
    res.status(200).json({success:true,data:user})
}