const commentController = require('../controller/comment')

module.exports = function (app, auth) {
  app.get('/post/:postId/comment', commentController.getCommentList)
  app.get('/post/:postId/comment/:commentId', commentController.getOneComment)
  app.post('/post/:postId/comment', auth, commentController.createComment)
  app.delete('/post/:postId/comment/:commentId', auth, commentController.deleteComment)
  app.put('/post/:postId/comment/:commentId', auth, commentController.updateComment)
}
