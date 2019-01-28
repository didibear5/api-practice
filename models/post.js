//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const PostModelSchema = new Schema({
  content: { type: String, required:true  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post',PostModelSchema);