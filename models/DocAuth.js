const mongoose=require('mongoose')

const DocAuthSchema = mongoose.Schema({
    name: {type:String,required:true},
    mobile:{type:String,required:true},
    password:{type:String,required:true},
    slotDuration:{type:Number,default:15}
})

module.exports=mongoose.model('DocAuth',DocAuthSchema)