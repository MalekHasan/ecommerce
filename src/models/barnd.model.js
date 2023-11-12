const mongoose = require('mongoose');
const brandSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'brand name is required'],
        unique:[true,'brand name is already exist,brand name must be unique'],
        trim:true,
        minLength:[2,'too short name']  
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    logo:{
        type:String,
    }
    ,
    
}, { timestamps: true })

const brandModel =mongoose.model('brand',brandSchema)
module.exports=brandModel