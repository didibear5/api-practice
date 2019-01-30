const _ = require('lodash')
const Passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const Session = require('./models/session')
const User = require('./models/user')

Passport.use(new BearerStrategy(
  async function (token, done) {
    const session = await Session.findOne({ token: token, expireAt: { '$gt': new Date() } })// greater than today
    console.log(session)
    console.log(token)

    if (_.isEmpty(session)) return done('Invalid token') // done passport的方法

    User.findOne({ _id: session.userId }, function (err, user) {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      return done(null, user, { scope: 'all' })
    })
  }
))

const isCurrentUser = (currentUserId, idToCheck) => {
  return currentUserId.toString() === idToCheck.toString()
}

const auth = (req, res, next) => {
  return Passport.authenticate('bearer', function (err, user, info) {
    if (err) return res.send({ status: 'error', message: err })
    if (_.isEmpty(user)) return res.send({ status: 'error', message: '查無此人' })
    req.user = user
    req.isCurrentUser = _.partial(isCurrentUser, user._id)
    next()
  }, { session: false })(req, res, next)
}

module.exports = auth
