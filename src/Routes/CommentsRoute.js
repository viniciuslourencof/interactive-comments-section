const CommentsController = require('../Controllers/CommentsController');
module.exports = (app) => {
   app.post('/comment', CommentsController.post);
   app.put('/comment/:id', CommentsController.put);
   app.delete('/comment/:id', CommentsController.delete);
   app.get('/comments', CommentsController.get);
   app.get('/comment/:id', CommentsController.getById);
}

