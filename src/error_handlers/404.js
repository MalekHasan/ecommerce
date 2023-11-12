module.exports=(req,res,next)=>{

    res.status(404).json({
        stauts:404,
        path:req.originalUrl,
        error:'Page Not Found'
    })
    }