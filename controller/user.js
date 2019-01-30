const User = require('../models/user')
const _ = require('lodash')
const sha256 = require('js-sha256')
const moment = require('moment') // 語意化時間的套件
const Session = require('../models/session')

async function createUser (req, res) {
  // 檢查帳號密碼空值
  if (_.isEmpty(req.body.username) || _.isEmpty(req.body.password)) {
    return res.send({ status: 'error', message: '帳號密碼不能為空' })
  }

  // 檢查重複
  const users = await User.find({ username: req.body.username })
  if (users.length > 0) return res.send({ status: 'error', message: '帳號已存在' })

  // 加密
  const encryptPassword = encryptString(req.body.password)
  const newUser = new User({
    username: req.body.username,
    password: encryptPassword
  })
  await newUser.save()
  res.send({ status: 'success', message: '註冊成功' })
}

async function login (req, res) {
  // 檢查帳號密碼輸入
  if (_.isEmpty(req.body.username) || _.isEmpty(req.body.password)) {
    return res.send({ status: 'error', message: '帳號密碼不能為空' })
  }

  // 到資料庫撈出此user
  const user = await User.findOne({ username: req.body.username })

  // 找不到回傳錯誤
  if (_.isEmpty(user)) return res.send({ status: 'error', message: '找不到此帳號' })

  // 檢查密碼
  const encryptPassword = encryptString(req.body.password)
  if (user.password !== encryptPassword) {
    return res.send({ status: 'error', message: '密碼錯誤' })
  }

  // 產生session & token，設定過期時間
  const newToken = encryptString(`${user._id.toString()}${new Date().toString()}`)
  const newSession = new Session({
    userId: user._id,
    token: newToken,
    expireAt: moment().add(7, 'days')
  })
  await newSession.save()

  // 回傳結果token
  res.send({ status: 'success', message: '登入成功', token: newSession.token })
}

module.exports = {
  createUser: createUser,
  login: login
}

function encryptString (str) {
  const encryptData = sha256.create()
  encryptData.update(str)
  encryptData.hex()
  return encryptData.toString()
}
