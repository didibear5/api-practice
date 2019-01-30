const Post = require('../models/post')
const _ = require('lodash')

async function getPostList (req, res) {
  const posts = await Post.find({}).populate('author', 'username')
  res.send(posts)
}

async function getOnePost (req, res) {
  console.log(req.params)
  const post = await Post.find({
    _id: req.params.postId
  }).populate('author', 'username')
  res.send(post)
}

async function createPost (req, res) {
  console.log(req.user)
  const newPost = new Post({
    content: req.body.content,
    author: req.user._id
  })
  await newPost.save()
  console.log(req.body)
  res.send('post created ok')
}

async function deletePost (req, res) {
  // Post.findOneAndDelete(
  //   { _id: req.params.postId }
  // ).exec()
  try {
    // 取出文章
    if (_.isEmpty(req.params.postId)) return res.send({ status: 'error', message: '請輸入文章ID' })
    const post = await Post.findOne({ _id: req.params.postId })
    if (_.isEmpty(post)) return res.send({ status: 'error', message: '找不到文章' })
    // 檢查文章作者是否為本人
    if (!req.isCurrentUser(post.author)) return res.send({ status: 'error', message: '無權限' })
    // 是本人更新文章內容
    await post.remove({ _id: req.params.postId })
    // 回傳成功訊息
    res.send({ status: 'success', message: '刪除成功' })
  } catch (error) {
    console.log(error)
    res.send({ status: 'error', message: '未預期的錯誤' })
  }
}

async function updatePost (req, res) {
  try {
    // 取出文章
    if (_.isEmpty(req.params.postId)) return res.send({ status: 'error', message: '請輸入文章ID' })
    const post = await Post.findOne({ _id: req.params.postId })
    if (_.isEmpty(post)) return res.send({ status: 'error', message: '找不到文章' })
    // 檢查文章作者是否為本人
    if (!req.isCurrentUser(post.author)) return res.send({ status: 'error', message: '無權限' })
    // 是本人更新文章內容
    await post.update({
      content: req.body.content,
      updateAt: new Date()
    })
    // 回傳成功訊息
    res.send({ status: 'success', message: '更改成功' })
  } catch (error) {
    console.log(error)
    res.send({ status: 'error', message: '未預期的錯誤' })
  }
}

module.exports = {
  getPostList: getPostList,
  getOnePost: getOnePost,
  createPost: createPost,
  deletePost: deletePost,
  updatePost: updatePost
}
