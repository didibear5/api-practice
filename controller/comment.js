const Comment = require('../models/comment')
const _ = require('lodash')

async function getCommentList (req, res) {
  console.log(req.params)
  const comment = await Comment.find({
    post_id: req.params.postId
  }).populate('author', 'username')
  res.send(comment)
}

async function getOneComment (req, res) {
  console.log(req.params)
  const comment = await Comment.find({
    _id: req.params.commentId
  }).populate('author', 'username')
  res.send(comment)
}

async function createComment (req, res) {
  console.log(req.params)
  const content = htmlEscape(req.body.content)
  const newComment = new Comment({
    post_id: req.params.postId,
    content: content,
    author: req.user._id,
    images: _.map(req.files, 'location')
  })
  await newComment.save()
  console.log(req.body)
  res.send({ status: 'success', message: 'comment created' })
}

async function deleteComment (req, res) {
  try {
    // 取出文章
    if (_.isEmpty(req.params.commentId)) return res.send({ status: 'error', message: '請輸入留言ID' })
    const comment = await Comment.findOne({ _id: req.params.commentId })
    if (_.isEmpty(comment)) return res.send({ status: 'error', message: '找不到留言' })
    // 檢查文章作者是否為本人
    if (!req.isCurrentUser(comment.author)) return res.send({ status: 'error', message: '無權限' })
    // 是本人更新文章內容
    await comment.remove({ _id: req.params.commentId })
    // 回傳成功訊息
    res.send({ status: 'success', message: '留言刪除成功' })
  } catch (error) {
    console.log(error)
    res.send({ status: 'error', message: '未預期的錯誤' })
  }
}

async function updateComment (req, res) {
  try {
    // 取出文章
    if (_.isEmpty(req.params.commentId)) return res.send({ status: 'error', message: '請輸入留言ID' })
    const comment = await Comment.findOne({ _id: req.params.commentId })
    if (_.isEmpty(comment)) return res.send({ status: 'error', message: '找不到留言' })
    // 檢查文章作者是否為本人
    if (!req.isCurrentUser(comment.author)) return res.send({ status: 'error', message: '無權限' })
    // 是本人更新文章內容
    await comment.update({
      content: req.body.content,
      updateAt: new Date()
    })
    // 回傳成功訊息
    res.send({ status: 'success', message: '留言更改成功' })
  } catch (error) {
    console.log(error)
    res.send({ status: 'error', message: '未預期的錯誤' })
  }
}

function htmlEscape (text) {
  return text.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

module.exports = {
  getCommentList: getCommentList,
  getOneComment: getOneComment,
  createComment: createComment,
  deleteComment: deleteComment,
  updateComment: updateComment
}
