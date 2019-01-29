const Post = require('../models/post')

async function getAll(req,res){
  const posts = await Post.find({})
  res.send(posts)
}

async function getOne(req,res){
  console.log(req.params)
  const post = await Post.find({
    _id:req.params.postId
  }).populate({path:'Comment', select: 'content'}).exec()
  res.send(post)
}

async function post(req,res){
  const newPost = new Post({
    content: req.body.content
  })
  await newPost.save()
  console.log(req.body);
  res.send('post created ok')
}

async function deleteOne(req,res){
  Post.findOneAndDelete(
    {_id:req.params.postId}
  ).exec()
  res.send('post deleted')
}

async function put(req,res){
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
}

module.exports = {
  getAll:getAll,
  getOne:getOne,
  post:post,
  deleteOne:deleteOne,
  put:put,
}