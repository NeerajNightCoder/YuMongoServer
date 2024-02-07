const Hospital=require('../models/Hospital.js')

//@desc Get all hospitals
//@route GET /api/v1/hospitals
//@access Public
exports.getHospitals=async(req,res,next)=>{
    try {
        const hospitals=await Hospital.find(req.query)
        res.status(200).json({success:true,count:hospitals.length, data:hospitals})
    
    } catch (error) {
        res.status(400).json({success:false})
    }
}


//@desc      Get single hospital
//@route     GET /api/v1/hospitals/:id
//access     Public
exports.getHospital=async(req,res,next)=>{
    try{
        const hospital=await Hospital.findById(req.params.id)
        if(!hospital){ return res.status(404).json({success:false})}
        res.status(200).json({success:true,data:hospital})
    }catch(error){
        res.status(400).json({success:false})
    }
}


//@desc Add hospital
//@route POST /api/v1/hospitals
//@access Private
exports.addHospital=async(req,res,next)=>{
   try {
    const hospital=await Hospital.create(req.body)
    res.status(201).json({
        success:true,
        data:hospital
    })
   } catch (error) {
       res.status(400).json({success:false})
   }
}