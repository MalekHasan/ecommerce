'use strict'
const subCategoryModel=require('../../models/subCategory.modle')
const slugify=require('slugify')
const ApiFeatures = require('../../utils/ApiFeatures')

async function getAllSubCategory(req,res) {
    
    const subApiFeatures =new ApiFeatures(subCategoryModel.find(),req.query)
    .paginate().filter().search().selected().sort()
    const result=  await subApiFeatures.mogooseQuery
    res.status(200).json(result)
}
// async function getAllSubCategory(req,res) {
//     let page=req.query.page*1 || 1
//     if(page<=0)page=1
//     let skip=(page -1)*5;
//     var countQuery =await subCategoryModel.countDocuments();
//     console.log(req.query.sort);
//     const result=  await subCategoryModel.find({}).sort(req.query.sort).skip(skip).limit(5);
//     res.status(200).json({
//         page:page,
//         nextPage:countQuery>5&& (page-1)*5+result.length<countQuery?page+1:undefined,
//         prevPage:page<5?undefined:page-1,
//         count:countQuery,
//         numOfPages:Math.ceil(countQuery/5),
//         results:result,
//     })
// }

async function getOneSubCategory(req,res) {
    const _id=req.params.id;
    const result=  await subCategoryModel.findOne({_id});
    res.status(200).json(result)
}

async function createSubCategory(req,res) {
    req.body.slug=slugify(req.body.name)
    const result=  new subCategoryModel(req.body);
    await result.save();
    res.status(200).json(result)
}

async function deleteSubCategory(req,res) {
    const _id=req.params.id;
    const result=  await subCategoryModel.findOneAndDelete(_id);
    res.status(200).json(result)
}

async function updateSubCategory(req,res) {
    const _id=req.params.id;
    req.body.slug=slugify(req.body.name)
    const result=  await subCategoryModel.findOneAndupdate(_id,req.body);
    res.status(200).json(result)
}

module.exports={
    getAllSubCategory,
    getOneSubCategory,
    createSubCategory,
    deleteSubCategory,
    updateSubCategory
}