'use strict'
const base64=require('base-64')
const bcrypt=require('bcrypt')
const userModel = require('../../models/users.model')

const basic=async (req,res,next)=>{
    if(req.headers.authorization){
        const encodedData=req.headers.authorization.split(" ").pop()
        const decodedData=base64.decode(encodedData).split(":")
        const [email,password]=decodedData
        const user=await userModel.findOne({email:email})
        if(user && bcrypt.compareSync(password,user.password)){
            req.user=user;
            next();
        }
        next('email or password are incorrect');
    }
    next('server Error')
}

module.exports=basic