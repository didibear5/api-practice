const postController = require('../controller/post')

module.exports = function (app, auth, upload) {
  app.get('/post', postController.getPostList)
  app.get('/post/:postId', postController.getOnePost)
  app.post('/post', auth, upload.array('images', 3), postController.createPost)// 路徑，中間層，controller
  app.delete('/post/:postId', auth, postController.deletePost)
  app.put('/post/:postId', auth, postController.updatePost)
}
