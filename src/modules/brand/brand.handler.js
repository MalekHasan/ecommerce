'use strict'
const barndModel=require('../../models/barnd.model')
const slugify=require('slugify')
const ApiFeatures = require('../../utils/ApiFeatures')

async function getAllBrand(req,res) {
    const apiFeatures =new ApiFeatures(barndModel.find(),req.query)
    .paginate().filter().search().selected().sort()
    const result=  await apiFeatures.mogooseQuery
    res.status(200).json(result)
}

async function getOneBrand(req,res) {
    const _id=req.params.id;
    const result=  await barndModel.findOne({_id});
    res.status(200).json(result)
}

async function createBrand(req,res) {
    console.log(req.file);
    req.body.logo=req.file.filename
    req.body.slug=slugify(req.body.name)
    const result=  new barndModel(req.body);
    await result.save();
    res.status(200).json(result)
}

async function deleteBrand(req,res) {
    const _id=req.params.id;
    const result=  await barndModel.findOneAndDelete(_id);
    res.status(200).json(result)
}

async function updateBrand(req,res) {
    const _id=req.params.id;
    req.body.slug=slugify(req.body.name)
    const result=  await barndModel.findOneAndupdate(_id,req.body);
    res.status(200).json(result)
}

module.exports={
    getAllBrand,
    getOneBrand,
    createBrand,
    deleteBrand,
    updateBrand
}