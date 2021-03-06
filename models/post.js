// Require Mongoose
const mongoose = require('mongoose')

// Define a schema
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const PostModelSchema = new Schema({
  content: { type: String, required: true },
  author: {
    type: ObjectId,
    required: true,
    index: true,
    ref: 'User'
  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  images: [String]
})

module.exports = mongoose.model('Post', PostModelSchema)
