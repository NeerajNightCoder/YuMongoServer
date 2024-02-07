const express=require('express')
const {loginDoc, registerDoc,getCredentials} = require('../controllers/docAuth')
const router=express.Router()
    router.route('/register')
          .post(registerDoc)

          router.route('/login')
          .post(loginDoc)
         
          router.route('/credentials/:phone')
                .get(getCredentials)

module.exports=router