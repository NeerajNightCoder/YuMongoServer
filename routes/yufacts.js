const express = require("express")
const { addPost, getPost,deletePost } = require('../controllers/yufacts')
const router = express.Router()

router.route('/')
    .get(getPost)
    .post(addPost)

router.route('/:id')
      .delete(deletePost)

module.exports = router