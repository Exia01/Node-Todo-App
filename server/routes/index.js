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

/* API Semi-restful setup  could move to separate if needed */
router.get('/api/todos', TodoController.index);
router.post('/api/todos', TodoController.create);
router.delete('/api/todos/:_id', TodoController.delete);

/* Catch all */
router.all('*', (req, res) => {
  res.sendFile(path.resolve('./client/public/views/page_404.html'));
});

module.exports = router;
