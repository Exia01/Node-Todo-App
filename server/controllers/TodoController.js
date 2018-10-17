const Todo = require('mongoose').model('Todo')

class TodoController {
    /*Find All */
    all(req, res) {
        Todo.find({}, (err, todos) => {
            if (todos) {
                return res.status(200).json(todos);
            } else {
                return res.status(404).json({
                    "error": err,
                    "message": "Failed to find todo items"
                });
            }
        });
    }

    /*Create Todo */
    create(req, res) {
        let todo = new Todo(req.body);

        todo.save(err => {
            if (err) {
                return res.status(403).json({
                    "error": err.errors,
                    "message": "Failed to create Todo!"
                });
            } else {
                return res.status(200).json(todo);
            }
        });
    }

    /*Delete Todo */
    delete(req, res) {
        Todo.findOne({ _id: req.params.id }, (err, todo) => {
            if (todo) {
                Todo.deleteOne({ _id: req.params.id }, (err) => {
                    if (err) {
                        return res.status(404).json({
                            "error": err,
                            "message": "Failed to remove todo item " + req.params.id
                        });
                    } else {
                        return res.status(200).json(todo);
                    }
                });
            } else {
                return res.status(404).json({
                    "error": err,
                    "message": "Failed to find todo item " + req.params.id
                });
            }
        });
    }

}

module.exports = new TodoController();
