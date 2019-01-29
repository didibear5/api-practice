const commentController = require('../controller/comment')

module.exports = function(app){
  app.get('/post/:postId/comment', commentController.getAll)
  app.get('/post/:postId/comment/:commentId', commentController.getOne)
  app.post('/post/:postId/comment', commentController.post)
  app.delete('/post/:postId/comment/:commentId', commentController.deleteOne)
  app.put('/post/:postId/comment/:commentId', commentController.put)
}