"use strict";
const Todo = require('mongoose').model('Todo');
const todoService = require('../service/todoService.js');


class TodoController {
  /* Find All */
  index(req, res) {
    todoService
      .todo_index()
      .then(todos => {
        return res.status(200).json(todos);
      })
      .catch(err => {
        return res.status(404).json({
          error: err,
          message: 'Failed to find todo items'
        });
      });
  }

  /* Create Todo */
  create(req, res) {
    todoService
      .todo_new(req)
      .then(todo => {
        return res.status(200).json(todo);
      })
      .catch(err => {
        // console.log(err)
        return res.status(403).json({
          error: err.errors,
          message: 'Failed to create Todo!'
        });
      });
  }

  /* Delete Todo */
  delete(req, res) {
    todoService
      .todo_delete(req)
      .then(todo => {
        return res.status(200).json(todo);
      })
      .catch(err => {
        return res.status(404).json({
          error: err,
          message: `Failed to remove todo item  ${req.params.id}`
        });
      });
  }
}

module.exports = new TodoController();
