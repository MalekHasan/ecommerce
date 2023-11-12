const mongoose = require('mongoose');
const subCategorySchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'SubCategory name is required'],
        unique:[true,'SubCategory name is already exist,SubCategory name must be unique'],
        trim:true,
        minLength:[2,'too short name']  
    },
    slug:{
        type:String,
        required:true,
        lowercase:true

    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category',

    }
}, { timestamps: true })
const subCategoryModel =mongoose.model('subcategory',subCategorySchema)
module.exports=subCategoryModel