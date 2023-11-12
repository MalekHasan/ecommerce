'use strict'
const productModel=require('../../models/product.model')
const slugify=require('slugify')
const ApiFeatures = require('../../utils/ApiFeatures')

async function getAllProduct(req,res) {
    
    const subApiFeatures =new ApiFeatures(productModel.find(),req.query)
    .paginate().filter().search().selected().sort()
    const result=  await subApiFeatures.mogooseQuery
    res.status(200).json(result)
}
// async function getAllProduct(req,res) {
//     let page=req.query.page*1 || 1
//     if(page<=0)page=1
//     let skip=(page -1)*5;
//     var countQuery =await productModel.countDocuments();
//     console.log(req.query.sort);
//     const result=  await productModel.find({}).sort(req.query.sort).skip(skip).limit(5);
//     res.status(200).json({
//         page:page,
//         nextPage:countQuery>5&& (page-1)*5+result.length<countQuery?page+1:undefined,
//         prevPage:page<5?undefined:page-1,
//         count:countQuery,
//         numOfPages:Math.ceil(countQuery/5),
//         results:result,
//     })
// }

async function getOneProduct(req,res) {
    const _id=req.params.id;
    const result=  await productModel.findOne({_id});
    res.status(200).json(result)
}

async function createProduct(req,res) {
    req.body.slug=slugify(req.body.name)
    req.body.imgCover=req.files.imgCover[0].filename
    req.body.images=req.files.images.map(obj=>obj.filename)
    const result=  new productModel(req.body);
    await result.save();
    res.status(200).json(result)
}

async function deleteProduct(req,res) {
    const _id=req.params.id;
    const result=  await productModel.findOneAndDelete(_id);
    res.status(200).json(result)
}

async function updateProduct(req,res) {
    const _id=req.params.id;
    req.body.slug=slugify(req.body.name)
    const result=  await productModel.findOneAndupdate(_id,req.body);
    res.status(200).json(result)
}

module.exports={
    getAllProduct,
    getOneProduct,
    createProduct,
    deleteProduct,
    updateProduct
}