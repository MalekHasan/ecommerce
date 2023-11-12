'use strict'
const express=require('express');
const { createProduct,deleteProduct,getAllProduct,getOneProduct,updateProduct } = require('./product.handler');
const { uploadMultiFile } = require('../../middelware/upload');

const productRouter=express.Router({mergeParams:true});
let arrayOfFields=[
    { name: 'imgCover', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]
  
productRouter.route('/').get(getAllProduct).post(uploadMultiFile(arrayOfFields,'product'),createProduct);
productRouter.route('/:id').get(getOneProduct).put(updateProduct).delete(deleteProduct)

module.exports=productRouter