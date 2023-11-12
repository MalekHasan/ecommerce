'use strict'
const express=require('express');
const { createBrand,deleteBrand,getAllBrand,getOneBrand,updateBrand } = require('./brand.handler');
const productRouter = require('../product/product.route');
const { uploadSingleFile } = require('../../middelware/upload');

const brandRouter=express.Router();
brandRouter.use("/:id/product",productRouter);
brandRouter.route('/').get(getAllBrand).post(uploadSingleFile('logo','brand'),createBrand);
brandRouter.route('/:id').get(getOneBrand).put(updateBrand).delete(deleteBrand)

module.exports=brandRouter
