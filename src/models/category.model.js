const mongoose = require('mongoose');
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Category name is required'],
        unique:[true,'Category name is already exist, Category name must be unique'],
        trim:true,
        minLength:[2,'too short name']  
        },
    image:String,
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    logo:{
        type:String,
    }
}, { timestamps: true })

const categoryModel =mongoose.model('category',categorySchema)

module.exports=categoryModel