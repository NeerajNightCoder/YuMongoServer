const mongoose=require('mongoose')
const shortid=require('shortid')

const DoctorSchema=mongoose.Schema({
    shortid: {type:String,default:shortid.generate},
    name:{type:String,required:true},
    photo:String,
    education:{type:String,default:"MBBS"},
    specialisation:{type:String},
    experience:{type:Number,default:10},
    normalFee:Number,
    recFee:Number,
    recDays:Number,
    ds:{required:true,type:[{day:String,timeSlots:[{time:String,status:{type:Boolean,default:true}}]}]},
    hospital:{type:mongoose.Schema.ObjectId,ref:'Hospital',required:true},
    city:{type:[String]},
    mr:{type:mongoose.Schema.ObjectId,ref:"User"},
    addedAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model("Doctor",DoctorSchema)