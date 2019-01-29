const Cmt = require('../models/comment')

async function getAll(req,res){
  const cmts = await Cmt.find({})
  res.send(cmts)
}

async function getOne(req,res){
  console.log(req.params)
  const cmt = await Cmt.findOne({
    _id:req.params.commentId
  })
  res.send(cmt)
}

async function post(req,res){
  console.log(req.params)
  const newCmt = new Cmt({
    post_id: req.params.postId,
    content: req.body.content
  })
  await newCmt.save()
  console.log(req.body);
  res.send('comment created ok')
}

async function deleteOne(req,res){
  Cmt.findOneAndDelete(
    {_id:req.params.commentId}
  ).exec()
  res.send('comment deleted')
}

async function put(req,res){
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
}

module.exports = {
  getAll:getAll,
  getOne:getOne,
  post:post,
  deleteOne:deleteOne,
  put:put,
}