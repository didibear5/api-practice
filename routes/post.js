const postController = require('../controller/post')

module.exports = function(app){
  app.get('/post', postController.getAll)
  app.get('/post/:postId', postController.getOne)
  app.post('/post', postController.post)
  app.delete('/post/:postId', postController.deleteOne)
  app.put('/post/:postId', postController.put)
}

