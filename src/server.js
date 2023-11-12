'use strict'
const express=require('express');
const mongoose = require('mongoose');
const serverErrorHandler= require('./error_handlers/404');
const pageErrorHandler= require('./error_handlers/500');
const categoryRouter = require('./modules/category/category.route');
const subcategoryRouter = require('./modules/subcategory/subcategory.route');
const brandRouter = require('./modules/brand/brand.route');
const productRouter = require('./modules/product/product.route');
const authRouter = require('./modules/auth/auth.route');

const app=express();
app.use(express.json())
app.use(express.static('uploads'))

app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/subcategory',subcategoryRouter)
app.use('/api/v1/brand',brandRouter)
app.use('/api/v1/product',productRouter)
app.use('/api/v1/auth',authRouter)

 app.get('/',(req,res)=>{
    res.json('ecommerce is running',)
})

function start(port) {
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    })
}
app.use(serverErrorHandler)
app.use(pageErrorHandler)


module.exports={
    start:start
}