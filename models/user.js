const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserModelSchema = new Schema({
  username: { type: String, required: true, index: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserModelSchema)
