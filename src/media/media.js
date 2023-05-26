const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'assets')
    },
    filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

function deleteimage(model){
    if(model.image){
        fs.unlink(`assets/${model.image}`,(err)=>{
            if(err){
                console.log(err)
                return false
            }
            return true
        })
}
}

module.exports= { upload,  deleteimage}