'use strict'
const express=require('express')
const {signUpHandler,signInHandler}=require('./auth.handler')
const basic = require('../../middelware/auth/basic.auth')
const authRouter=express.Router()
authRouter.post('/signup',signUpHandler)
authRouter.post('/signin',basic,signInHandler)


module.exports=authRouter