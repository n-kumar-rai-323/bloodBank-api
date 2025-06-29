const multer  = require('multer')
const fs = require("fs")
const storageConfigration = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = "./public"
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }
        cb(null, path)
    },
    filename: (req, file, cb) => {
        // time 
        let filename = Date.now() + "-" + file.originalname
        cb(null, filename)
    }
})
const uploader = (type = 'image') => {

    let allowExts = ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif']
    let fileSizeLimit = 3000000
    if (type === 'doc') {
        allowExts = ['doc', 'docx', 'json', 'pdf', 'txt']
        fileSizeLimit = 5000000
    }else if(type ==='audio'){
        allowExts = ['mp3']
        fileSizeLimit = 3000000
    }
    // storage 
    const fileFilter = (req, file,cb)=>{
        let  ext = file.originalname.split(".").pop().toLowerCase()
        if(allowExts.includes(ext)){
            cb(false, true)
        }else{
            cb({
                code:422,
                message: "File format not supported",
                status: "INVALID_FILE_FORMAT"
            })
        }
    }
    return multer({
        storage: storageConfigration,
        fileFilter: fileFilter,
        limits: {
            fileSize: fileSizeLimit
        }
    })
}


module.exports = uploader