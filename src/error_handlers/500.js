module.exports=(err,req,res,next)=>{
res.status(500).json({
    stauts:500,
    message:'Internal Server Error',
    error:err
})
}