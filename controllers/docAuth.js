const DocAuth= require('../models/DocAuth')

exports.registerDoc= async(req, res, next) => {
    try {
        console.log("registering")
        console.log(JSON.stringify(req.body))
        let {name,mobile,password,slotDuration}=req.body
        const doc=await DocAuth.create({
            name:name,
            mobile: mobile,
            password: password,
            slotDuration:slotDuration
        })
        res.status(200).json({msg:"Doctor registered successfully",doc})
    } catch (error) {
        res.status(400).json({msg:error})
    }
}

exports.loginDoc=async(req,res,next)=>{
    try {
        let {mobile,password}=req.body

        const doc=await DocAuth.findOne({mobile:mobile,password:password})
        if(!doc)
        return res.status(400).json({doc:doc})
        else res.status(200).json({doc:doc})

    } catch (error) {
        res.status(400).json({msg: error})
    }
}

exports.getCredentials=async(req,res,next)=>{
    try {

        const doc=await DocAuth.findOne({mobile:req.params.phone})
        if(!doc)
        return res.status(400).json({doc:doc})
        else res.status(200).json({doc:doc})

    } catch (error) {
        res.status(400).json({msg: error})
    }
}
