// 引入 module
const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
// 產生一個 express instance - app
const app = express()
app.use(bodyParser.json())
const auth = require('./auth')
const port = process.env.PORT || 3000

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
aws.config.loadFromPath('config/aws_config.json')// 載入登入資料

const s3 = new aws.S3({})

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'backend-practice-hezi',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      const ext = _.last(_.get(file, 'originalname', '').split('.')) || ''
      cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
    }
  })
})

/* 存到本地資料夾
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload')
  },
  filename: function (req, file, cb) {
    const ext = _.last(_.get(file, 'originalname', '').split('.')) || '';
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
  }
})
const upload = multer({ storage: storage })
*/

app.use(express.static('public'))// 讀資料夾裡的檔案
app.use('/upload', express.static('upload'))

require('./db')
require('./routes/post')(app, auth, upload)
require('./routes/comment')(app, auth, upload)
require('./routes/user')(app)

app.post('/upload', upload.single('file'), function (req, res) {
  res.send('upload successed')
})

// 讓 express server 跑在 port 3000
app.listen(port, function () {
  console.log(port)
})
