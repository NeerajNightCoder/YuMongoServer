const mongoose=require('mongoose')

const DocPhotoSchema = mongoose.Schema({
   docId:String,
   photo:String
})

module.exports=mongoose.model('DocPhoto',DocPhotoSchema)