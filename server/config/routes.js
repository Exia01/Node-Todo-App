const path = require('path');
const TodoController = require('../controllers/TodoController.js');


/* Exporting function which takes in the app (server.js :ln 22) handles all the requests */
module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('landing')
    })

    app.get('/todo', (req, res) => {
        res.render('todo')
    })


    /* API Semi-restful setup */
    app.get('/api/todos', TodoController.all);
    app.post('/api/todos', TodoController.create);
    app.delete('/api/todos/:id', TodoController.delete);

    /* Catch all */
    app.all('*', (req, res) => {
        res.sendFile(path.resolve('./client/public/views/404.html'));
    })

};