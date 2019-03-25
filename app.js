// 引入 module
const express = require('express')
const bodyParser = require('body-parser')
// 產生一個 express instance - app
const app = express()
app.use(bodyParser.json())
const auth = require('./auth')

app.use(express.static('public'))// 讀資料夾裡的檔案

require('./db')
require('./routes/post')(app, auth)
require('./routes/comment')(app, auth)
require('./routes/user')(app)

// 讓 express server 跑在 port 3000
app.listen(3000, function () {
  console.log('meow')
})
