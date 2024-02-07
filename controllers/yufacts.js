const Post = require('../models/Post')
exports.addPost = async(req, res, next) => {
    try {

        const post = await Post.create(req.body) //created appointment with staus=awaitingpayment 
        res.status(201).json({
            success: true,
            post:post

        })
    } catch (error) {
        console.log(error)
    }
}


exports.getPost = async(req, res, next) => {
    try {
        const posts = await Post.find(req.query).sort({order:-1})
        res.status(200).json({ success: true,count:posts.length, data: posts })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}

exports.deletePost = async(req, res, next) => {
    try {

        const post = await Post.findByIdAndDelete(req.params.id) //created appointment with staus=awaitingpayment 
        res.status(200).json({
            deleted: true

        })
    } catch (error) {
        console.log(error)
    }
}
