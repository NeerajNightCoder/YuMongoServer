const User=require('../models/User')

//@desc      Get all users
//@route     GET /api/v1/users
//access     Public
exports.getUsers=async(req,res,next)=>{
    try {
        let query
        const reqQuery={...req.query}

        //Fields to exclude
        const removeFields=['select','sort','page','limit']
        
        //Loop over removeFields and delete them from reqQuery
        removeFields.forEach(param=>delete reqQuery[param])

        let queryStr=JSON.stringify(reqQuery)
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`)
        
        //Finding resource
        query=User.find(JSON.parse(queryStr))

        //Select fields
        if(req.query.select)
        {
            const fields=req.query.select.split(',').join(' ')
            query=query.select(fields)
           
            
        }

        if(req.query.sort)
        {
            const sortBy=req.query.sort.split(',').join(' ')
            query=query.sort(sortBy)
        }
        else
        {
            query=query.sort('name')
        }

        //Pagination
        const page=parseInt(req.query.page,10)||1
        console.log(page)
        const limit=parseInt(req.query.limit,10)||50
        const startIndex=(page-1)*limit
        const endIndex=page*limit
        const total=await User.countDocuments()
        query=query.skip(startIndex).limit(limit)

        //Executing query
        const users=await query

        //Pagination result
        const pagination={}

        if(endIndex<total){
            pagination.next={page:page+1,limit}
        }
        if(startIndex>0){
            pagination.prev={page:page-1,limit}
        }

    res.status(200).json({success:true,count:users.length,pagination ,data:users})
    } catch (error) {
        res.status(400).json({success:false})
    }

}

//@desc      Get single doctor
//@route     GET /api/v1/doctors/:id
//access     Public
exports.getUser=async(req,res,next)=>{
    try{
        // if(req.user._id==req.params.id)
        {
            console.log(`${req.params.id}`.cyan.bold)
            const user=await User.findById(req.params.id)
            if(!user){ return res.status(404).json({success:false})}
           return res.status(200).json({success:true,data:user})
        }
        // else {
            // return res.status(400).json({success:false})
        // }
       
    }catch(error){
        res.status(400).json({success:false})
    }
}




 //@desc      Update user
 //@route     PUT /api/v1/users/:id
 //access     Private
 exports.updateUser=async(req,res,next)=>{
     try {
         const user=await User.findByIdAndUpdate(req.params.id,req.body,{
             new:true,
             runValidators:true
         })
         if(!user){return res.status(404).json({success:false})}
         res.status(200).json({success:true,data:user})
     } catch (error) {
         res.status(400).json({success:false})
     }
 }
 
 //@desc      Remove  user
 //@route     DELETE /api/v1/users/:id
 //access     Private
 exports.deleteUser=async(req,res,next)=>{
     try {
         const user=await User.findByIdAndDelete(req.params.id)
     if(!user){return res.status(404).json({success:false})}
     res.status(400).json({success:true})
     } catch (error) {
         res.status(400).json({success:false})
     }
 }
 

 