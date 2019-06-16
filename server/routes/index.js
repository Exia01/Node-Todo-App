const express         = require('express');
const router          = express.Router();
const path            = require('path');
const TodoController  = require('../controllers/TodoController.js');

router.get('/', (req, res) => {
  res.render('landing');
});

router.get('/todo', (req, res) => {
  res.render('todo');
});

/* API Semi-restful setup */
router.get('/api/todos', TodoController.all);
router.post('/api/todos', TodoController.create);
router.delete('/api/todos/:id', TodoController.delete);

/* Catch all */
router.all('*', (req, res) => {
  res.sendFile(path.resolve('./client/public/views/page_404.html'));
});

module.exports = router;
