'use strict'
const categoryModel=require('../../models/category.model')
const slugify=require('slugify')
const ApiFeatures = require('../../utils/ApiFeatures')

async function getAllCategory(req,res) {
    const apiFeatures =new ApiFeatures(categoryModel.find(),req.query)
    .paginate().filter().search().selected().sort()
    const result=  await apiFeatures.mogooseQuery
    res.status(200).json(result)
}

async function getOneCategory(req,res) {
    const _id=req.params.id;
    req.body.logo=req.file.filename
    const result=  await categoryModel.findOne({_id});
    res.status(200).json(result)
}

async function createCategory(req,res) {
    req.body.slug=slugify(req.body.name)
    const result=  await categoryModel.findOne(req.body);
    res.status(200).json(result)
}

async function deleteCategory(req,res) {
    const _id=req.params.id;
    const result=  await categoryModel.findOneAndDelete(_id);
    res.status(200).json(result)
}

async function updateCategory(req,res) {
    const _id=req.params.id;
    req.body.slug=slugify(req.body.name)
    const result=  await categoryModel.findOneAndupdate(_id,req.body);
    res.status(200).json(result)
}

module.exports={
    getAllCategory,
    getOneCategory,
    createCategory,
    deleteCategory,
    updateCategory
}