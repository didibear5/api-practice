const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const CommentModelSchema = new Schema({
  post_id: { type: ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },
  author: {
    type: ObjectId,
    required: true,
    index: true,
    ref: 'User'
  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment', CommentModelSchema)
