const mongoose=require('mongoose')

const HospitalPhotoSchema = mongoose.Schema({
   hospitalId:String,
   photo:String
})

module.exports=mongoose.model('HospitalPhoto',HospitalPhotoSchema)