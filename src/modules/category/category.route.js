'use strict'
const express=require('express');
const { getAllCategory,deleteCategory,getOneCategory,createCategory,updateCategory } = require('./category.handler');
const subCategoryRouter = require('../subcategory/subcategory.route');
const { uploadSingleFile } = require('../../middelware/upload');

const categoryRouter=express.Router();
categoryRouter.use("/:id/subcategory",subCategoryRouter);
categoryRouter.route('/').get(getAllCategory).post(uploadSingleFile('logo','category'),createCategory);
categoryRouter.route('/:id').get(getOneCategory).put(updateCategory).delete(deleteCategory)

module.exports=categoryRouter