'use strict'
const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product name is required'],
        trim:true,
        minLength:[2,'too short name']
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    description:{
        type:String,
        trim:true
    },
    price:{
        type:Number,
        required:[true,'Price is required'],
    },
    quantity:{
        type:Number,
        required:[true,'Product Quantity is required'],
    },
    ratingAvg:{
        type:Number,
        default:0
    },
    ratingCount:{
        type:Number,
        default:0
    },
    soldCount:{
        type:Number,
        default:0
    },
    priceAfterDiscount:{
        type:Number,
        default:0
    },
    imgCover:String,
    images:[String],
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    subcategory:{
        type:mongoose.Types.ObjectId,
        ref:'subcategory'
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'brand'
    },

},{ timestamps: true })
const productModel=mongoose.model('product',productSchema)
module.exports=productModel