const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage }).single('avatar')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/', upload, (req, res) => {
  res.json({ avatar: req.file.path })
  console.log(req.file)
})

const port = 5000
app.listen(port, () => {
  console.log('Server is listening to port', port)
})
