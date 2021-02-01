// MULTER 
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/imageReceived')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const date = Date.now()

      cb(null, date + '-' + file.originalname)
    }
  })

  const upload = multer({ storage: storage,
                        fileFilter: function(req,file,cb) {
                            if(
                                file.mimetype === "image/png" ||
                                file.mimetype === "image/gif" ||
                                file.mimetype === "image/jpg" ||
                                file.mimetype ==="image/jpeg"
                            ) {
                                cb(null,true)
                            } else cb(null,false)
                        }
})

module.exports = upload