const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/upload'),
    filename: (req, file, cb) =>{
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})

const uploadImage = multer({
    storage: storage,
    limits: {fileSize : 1000000},
    fileFilter: (req, file, cb) =>{
        const filetypes = /jpeg|jpg|png/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))
        if(mimetype && extname){
            return cb(null, true)
        }else{
            cb('Error en extension de imagen xd')
        }
    }
}).single('image')

module.exports = {
    uploadImage
}