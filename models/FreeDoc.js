const mongoose=require('mongoose')

const FreeDocSchema = mongoose.Schema({
      docId:{type:String,required:true,unique:true}
})

module.exports=mongoose.model('FreeDoc',FreeDocSchema)