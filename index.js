'use strict'
require('dotenv').config();
const {start}=require('./src/server')
const port=process.env.PORT || 8000;
const mongoose = require('mongoose');



mongoose.connect(process.env.DB_URL).then(()=>{
    start(port)
})