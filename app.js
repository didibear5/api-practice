// 引入 module
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// 產生一個 express instance - app
const app = express()
app.use(bodyParser.json())


//Set up default mongoose connection
const mongoDB = 'mongodb://localhost/testdb';
mongoose.connect(mongoDB); 
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./routes/post')(app)
require('./routes/comment')(app)

// 讓 express server 跑在 port 3000
app.listen(3000, function(){
  console.log("meow")
})