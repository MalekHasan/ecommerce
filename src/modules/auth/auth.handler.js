'use strict'
const userModel=require('../../models/users.model')
async function signUpHandler(req,res) {
    console.log(req.body);
    const record=new userModel(req.body);
    await record.save();
    res.status(201).json(record)
}
async function signInHandler(req,res) {
res.status(200).json(req.user)
}


module.exports={signUpHandler,signInHandler}