const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const SessionModelSchema = new Schema({
  userId: { type: ObjectId, required: true, index: true },
  token: { type: String, required: true, index: true },
  createAt: { type: Date, default: Date.now },
  expireAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Session', SessionModelSchema)
