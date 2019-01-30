const userController = require('../controller/user')

module.exports = function (app) {
  app.post('/user', userController.createUser)
  app.post('/user/login', userController.login)
}
