'use strict'
const express=require('express');
const { createSubCategory,deleteSubCategory,getAllSubCategory,getOneSubCategory,updateSubCategory } = require('./subcategory.handler');

const subCategoryRouter=express.Router({mergeParams:true});

subCategoryRouter.route('/').get(getAllSubCategory).post(createSubCategory);
subCategoryRouter.route('/:id').get(getOneSubCategory).put(updateSubCategory).delete(deleteSubCategory)

module.exports=subCategoryRouter