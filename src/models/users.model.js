'use strict'
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const userSchema=mongoose.Schema({
username:{
    type:String,
    required:true,
    menLength:[3,'your name should be ore than 2 char ']
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
addresses:[String],
wishlist:[mongoose.Types.ObjectId],
image:{
    type:String,
},
role:{
    type:String,
    enum:['admin','user'],
    default:'user'

}
},{ toJSON: { virtuals: true } },{timestamps:true})
userSchema.virtual('capabilities').get(function(){
    let acl={
        admin:['read','create','update','delete','submit'],
        user:['read','submit'],
    }
    return acl[this.role]
})
userSchema.virtual('token').get(function(){
    return jwt.sign({role:this.role,capabilities:this.capabilities,email:this.email},process.env.SECRET)

})
userSchema.method=('basicAuth',function(username,password){
    console.log(username,password);
// this.model.find()
})
userSchema.pre('save',function(){
    this.password=bcrypt.hashSync(this.password,12)
})

const userModel=mongoose.model('user',userSchema)
module.exports=userModel;