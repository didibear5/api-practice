//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const CommentModelSchema = new Schema({
  post_id: { type: Schema.ObjectId , ref: 'Post', required:true },
  content: { type: String, required:true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment',CommentModelSchema);