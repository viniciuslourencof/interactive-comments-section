// const CommentsController = require('../Controllers/CommentsController');
// module.exports = (app) => {
//    app.post('/comment', CommentsController.post);
//    app.put('/comment/:id', CommentsController.put);
//    app.delete('/comment/:id', CommentsController.delete);
//    app.get('/comments', CommentsController.get);
//    app.get('/comment/:id', CommentsController.getById);
// }


const express = require('express');
const router = express.Router();
const controller = require('../Controllers/CommentsController')
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.get('/', controller.get);
module.exports = router;