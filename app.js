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

const Post = require('./models/post')
const Cmt = require('./models/comment')

app.get('/',function(req, res){
  res.send('hello')
})

/* post */
app.get('/post', async(req,res) => {
  // Post.find({}).then(posts =>{
  //   console.log(posts);
  // })
  const posts = await Post.find({})
  res.send(posts)
})

app.get('/post/:postId', async(req,res) => {
  console.log(req.params)
  const cmt = await Cmt.find({
    post_id:req.params.postId
  })
  var post = await Post.find({
    _id:req.params.postId
  })
  var output = []
  output.push(post[0])
  for(let i = 0; i < cmt.length; i++){
    output.push(cmt[i])
  }
  post[0].comment = cmt
  res.send(output)
})

app.post('/post', async(req,res) => {
  const newPost = new Post({
    content: req.body.content
  })
  await newPost.save()
  console.log(req.body);
  res.send('post created ok')
})

app.delete('/post/:postId', (req,res) => {
  Post.findOneAndDelete(
    {_id:req.params.postId}
  ).exec()
  res.send('post deleted')
})

app.put('/post/:postId', async(req,res) => {
  await Post.findOneAndUpdate(
    {_id:req.params.postId},
    {
      '$set':{
        content: req.body.content,
        updateAt: new Date()
      }
    }
  ).exec()
  res.send('post updated')
})


/* comments */
app.get('/comment', async(req,res) => {
  const cmts = await Cmt.find({})
  res.send(cmts)
})

app.get('/comment/:commentId', async(req,res) => {
  console.log(req.params)
  const cmt = await Cmt.find({
    _id:req.params.commentId
  })
  res.send(cmt)
})

app.post('/comment', async(req,res) => {
  const newCmt = new Cmt({
    post_id: req.body.post_id,
    content: req.body.content
  })
  await newCmt.save()
  console.log(req.body);
  res.send('comment created ok')
})

app.delete('/comment/:commentId', (req,res) => {
  Cmt.findOneAndDelete(
    {_id:req.params.commentId}
  ).exec()
  res.send('comment deleted')
})

app.put('/comment/:commentId', async(req,res) => {
  await Cmt.findOneAndUpdate(
    {_id:req.params.commentId},
    {
      '$set':{
        content: req.body.content,
        updateAt: new Date()
      }
    }
  ).exec()
  res.send('comment updated')
})


// 讓 express server 跑在 port 3000
app.listen(3000, function(){
  console.log("meow")
})