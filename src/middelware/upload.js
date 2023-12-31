const multer  = require('multer')
const uploading=(folderName)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, uniqueSuffix + '-'+ file.originalname  )
        }
      })
        function fileFilter (req, file, cb) {
            if(file.mimetype.startsWith('image')){
                cb(null, true)
            }
            else{
                cb(new Error('I don\'t have a clue!'),false)
            }
        }
    return multer({ storage , fileFilter })
}
const uploadSingleFile=(felidName,folderName)=>uploading(folderName).single(felidName)
const uploadMultiFile=(arrayOfFields,folderName)=>uploading(folderName).fields(arrayOfFields)
module.exports={
    uploadSingleFile,
    uploadMultiFile
}